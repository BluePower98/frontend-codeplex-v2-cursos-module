import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { merge } from 'lodash-es';
import { FUSE_APP_CONFIG } from '@fuse/services/config/config.constants';
import { MenuOptions } from '@fuse/constants/menu-options.constant';

@Injectable({
    providedIn: 'root'
})
export class FuseConfigService
{
    private _config: BehaviorSubject<any>;

    private modeOpenMenuOptions: MenuOptions= MenuOptions.normal;

    private videosByMenu: BehaviorSubject<Array<any>> = new BehaviorSubject<Array<any>>([]);


    /**
     * Constructor
     */
    constructor(@Inject(FUSE_APP_CONFIG) config: any)
    {
        // Private
        this._config = new BehaviorSubject(config);
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Setter & getter for config
     */
    set config(value: any)
    {
        // Merge the new config over to the current config
        const config = merge({}, this._config.getValue(), value);

        // Execute the observable
        this._config.next(config);
    }

    get config$(): Observable<any>
    {
        return this._config.asObservable();
    }

    set videosByMenu$(videos: any) {
        this.videosByMenu.next(videos);
    }
    
    get videosByMenu$(): Observable<Array<any>> {
        return this.videosByMenu.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Resets the config to the default
     */
    reset(): void
    {
        // Set the config
        this._config.next(this.config);
    }

    setModeOpenMenuOptions(mode: MenuOptions) {
        this.modeOpenMenuOptions = mode;
    }

    getModeOpenMenuOptions(): MenuOptions {
        return this.modeOpenMenuOptions;
    }
}
