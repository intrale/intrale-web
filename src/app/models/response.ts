import { Error } from './error'
import { error } from 'protractor'

export interface Response {
    errors: Error[];
}