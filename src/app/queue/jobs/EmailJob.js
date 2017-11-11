import Job from '../../../../libs/framework/jobs/Job'

export default class EmailJob extends Job {
    static key = 'send_email';
    channel = 'default';

    data = {
        title: null,
        content: null
    };

    init(title, content) {
        Object.assign(this.data, {title, content})
    }

    handle() {
        a()

        console.log(this.data.title)

        return new Promise((resolve) => {
            setTimeout(resolve, 2000)
        })
    }
}