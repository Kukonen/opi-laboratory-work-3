class Validator {
    static email(text: string) : boolean {
        return /^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/.test(text);
    }

    static login(text: string) : boolean {
        return /^[a-zA-Z][a-zA-Z0-9-_\.]{1,20}$/.test(text);
    }

    static password(text: string) : boolean {
        return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/.test(text);
    }

    static name(text: string) : boolean {
        return /[а-яА-Я]+/.test(text);
    }
}


export default Validator;