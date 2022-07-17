import { ApplicationRef, ComponentFactoryResolver, ComponentRef, EmbeddedViewRef, Injectable, Injector } from "@angular/core";
import { LoadingComponent } from "@components/shared/loading/loading.component";

@Injectable({
    providedIn: 'root'
})
export class LoadingController {
    private componentRef: ComponentRef<LoadingComponent>;

    constructor(
        private componentFactoryResolver: ComponentFactoryResolver,
        private appRef: ApplicationRef,
        private injector: Injector
    ) {}

    create(message: string = 'Cargando...') {
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(LoadingComponent);
        
        this.componentRef = componentFactory.create(this.injector);

        this.componentRef.instance.message = message;

        return this;
    }

    present(): void {
        const { hostView } = this.componentRef;

        this.appRef.attachView(hostView);

        const domElem = (hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;

        document.body.appendChild(domElem);
    }

    dismiss(): void {
        this.appRef.detachView(this.componentRef.hostView);
        this.componentRef.destroy();
    }
}