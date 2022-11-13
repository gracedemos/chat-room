class UserState {
    static user = "";
    static getUser() {
        return this.user;
    }
    static setUser(newUser) {
        this.user = newUser;
    }
}

export default UserState;