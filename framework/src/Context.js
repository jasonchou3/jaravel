export default class Context {
    static app;

    get app() {
        return this.constructor.app;
    }


    event_fire(event_name, args) {
        this.app.event_fire(event_name, args)
    }

    service() {
        return this.app.service(...arguments)
    }
}