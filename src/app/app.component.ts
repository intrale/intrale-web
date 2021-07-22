import {Component, AfterViewInit, OnDestroy, ViewChild, Renderer2, OnInit} from '@angular/core';
import {trigger, state, style, transition, animate, ɵAnimationGroupPlayer} from '@angular/animations';
import {ScrollPanel, MessageService} from 'primeng/primeng';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { SignInService } from './services/auth/signin/signin.service'
import { SignInRequest } from './services/auth/signin/signin.request'
import { SignInResponse } from './services/auth/signin/signin.response'

import Endpoints from './config/endpoints.json'
import { AppState } from './config/appstate';
import { Error } from './models/error';
import { ServiceError } from './services/serviceError'

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    animations: [
        trigger('submenu', [
            state('hidden', style({
                height: '0px'
            })),
            state('visible', style({
                height: '*'
            })),
            transition('visible => hidden', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)')),
            transition('hidden => visible', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)'))
        ])
    ],
    providers: [SignInService, MessageService]
})
export class AppComponent implements AfterViewInit, OnDestroy, OnInit {

    formGroup: FormGroup;
    passwordChange: FormGroup;

    loginExecuted: boolean = false;

    passwordExpired: boolean;

    public menuInactiveDesktop: boolean;

    public menuActiveMobile: boolean;

    public profileActive: boolean;

    public topMenuActive: boolean;

    public topMenuLeaving: boolean;

    @ViewChild('scroller', { static: true }) public scrollerViewChild: ScrollPanel;

    documentClickListener: () => void;

    menuClick: boolean;

    topMenuButtonClick: boolean;

    constructor(private formBuilder: FormBuilder, 
                public renderer: Renderer2, 
                private http: HttpClient, 
                private messageService: MessageService,
                private signinService: SignInService,
                protected router:Router,
                private appState: AppState) {}

    ngOnInit(): void {
        this.formGroup = this.formBuilder.group({
            username: new FormControl('',  Validators.required),
            password: new FormControl('', Validators.required)
        });
        this.passwordChange = this.formBuilder.group({
            passwordChange: new FormControl('',  Validators.required),
            newPasswordChange: new FormControl('', Validators.required),
            newPasswordChangeReply: new FormControl('', Validators.required)
        });
        this.passwordExpired = false;
    }

    ngAfterViewInit() {
        //setTimeout(() => {this.scrollerViewChild.moveBar(); }, 100);

        // hides the overlay menu and top menu if outside is clicked
        this.documentClickListener = this.renderer.listen('body', 'click', (event) => {
            if (!this.isDesktop()) {
                if (!this.menuClick) {
                    this.menuActiveMobile = false;
                }

                if (!this.topMenuButtonClick) {
                    this.hideTopMenu();
                }
            }

            this.menuClick = false;
            this.topMenuButtonClick = false;
        });
    }

    toggleMenu(event: Event) {
        this.menuClick = true;
        if (this.isDesktop()) {
            this.menuInactiveDesktop = !this.menuInactiveDesktop;
            if (this.menuInactiveDesktop) {
                this.menuActiveMobile = false;
            }
        } else {
            this.menuActiveMobile = !this.menuActiveMobile;
            if (this.menuActiveMobile) {
                this.menuInactiveDesktop = false;
            }
        }

        if (this.topMenuActive) {
            this.hideTopMenu();
        }

        event.preventDefault();
    }

    toggleProfile(event: Event) {
        this.profileActive = !this.profileActive;
        event.preventDefault();
    }

    toggleTopMenu(event: Event) {
        this.topMenuButtonClick = true;
        this.menuActiveMobile = false;

        if (this.topMenuActive) {
            this.hideTopMenu();
        } else {
            this.topMenuActive = true;
        }

        event.preventDefault();
    }

    hideTopMenu() {
        this.topMenuLeaving = true;
        setTimeout(() => {
            this.topMenuActive = false;
            this.topMenuLeaving = false;
        }, 500);
    }

    onMenuClick() {
        this.menuClick = true;

        //setTimeout(() => {this.scrollerViewChild.moveBar(); }, 500);
    }

    isDesktop() {
        return window.innerWidth > 1024;
    }

    onSearchClick() {
        this.topMenuButtonClick = true;
    }

    ngOnDestroy() {
        if (this.documentClickListener) {
            this.documentClickListener();
        }
    }


    isLoginAvaiable(){
        return !this.loginExecuted
    }

    isExecuting():boolean{
        return this.appState.isExecuting();
    }

    onLogin(){
        if (this.formGroup.valid){
            this.loginExecuted = true;
            this.signinService.execute(
                {
                    email: this.formGroup.get('username').value,
                    password: this.formGroup.get('password').value
                } as SignInRequest)
                .subscribe(
                    value=> { 
                        localStorage.setItem('accessToken', value.accessToken);
                        localStorage.setItem('refreshToken', value.refreshToken);
                        this.endCall();
                    }, 
                    error => { 
                        let serviceError:ServiceError = error;
                        this.passwordExpired = serviceError.find('NEW_PASSWORD_REQUIRED');
                        this.endCall();
                    });
        }
    }

    private endCall(){
        // always on return with or without errors
        localStorage.setItem('username', this.formGroup.get('username').value);
        this.formGroup.get('username').reset();
        this.formGroup.get('password').reset();
        this.loginExecuted = false
    }


    changePassword(){
        this.passwordExpired=false;
        this.signinService.execute(
            {
                email: localStorage.getItem('username'),
                password: this.passwordChange.get('passwordChange').value,
                newPassword : this.passwordChange.get('newPasswordChange').value
            } as SignInRequest)
            .subscribe(
                value=> { 
                    localStorage.setItem('accessToken', value.accessToken);
                    localStorage.setItem('refreshToken', value.refreshToken);
                    this.endChangeCall();
                }, 
                error => { 
                    this.endChangeCall();
                });
    }

    endChangeCall(){
        // always on return with or without errors
        this.passwordChange.get('passwordChange').reset();
        this.passwordChange.get('newPasswordChange').reset();
        this.passwordChange.get('newPasswordChangeReply').reset();
        this.loginExecuted = false
    }

    onLogout(){
        localStorage.removeItem('username');
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('executingNumber');
        this.router.navigate(['/']);

    }

    isAuthenticated(): boolean{
        let token = localStorage.getItem('accessToken');
        return (token && token.trim().length>0)
    }
}
