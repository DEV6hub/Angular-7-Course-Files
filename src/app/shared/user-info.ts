export class UserInfo {
        public name: string;
        public email: string;
        public phone: number;
        public address1: string;
        public address2: string;
        public city: string;
        public country: string;
        public province: string;
        public postal: string;
        constructor(userInfo: any) {
            this.name = userInfo.name;
            this.email = userInfo.email;
            this.phone = userInfo.phone;
            this.address1 = userInfo.address1;
            this.address2 = userInfo.address2;
            this.city = userInfo.city;
            this.country = userInfo.country;
            this.province = userInfo.province;
            this.postal = userInfo.postal;
        }
}
