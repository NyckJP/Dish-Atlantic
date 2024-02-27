import { User } from "../../models/index.js"

class UserSeeder {
    static async seed() {
        await User.query().delete()

        const  User1 = await User.query().insert({
            userName: "Bobby",
            email: "bobby@email.com",
            cryptedPassword: "EeZGd9uvEfeeJvahVqN4cG8qGjtwtPJf"
        })
        const  User2 = await User.query().insert({
            userName: "Stella",
            email: "stella@email.com",
            cryptedPassword: "Z8AnemwzVWbh593TvPN2qMyXHBBrvAFv"
        })
        const  User3 = await User.query().insert({
            userName: "Nasiba",
            email: "nasiba@email.com",
            cryptedPassword: "wFKzBgZ8PydRsTh7kfzHsVYVXhbxRqrr"
        })
        const  User4 = await User.query().insert({
            userName: "Kerri",
            email: "kerri@email.com",
            cryptedPassword: "SuasRs7qtujE2b8UUkDwTwSAnBQYVqag"
        })
        const  User5 = await User.query().insert({
            userName: "Kay",
            email: "kay@email.com",
            cryptedPassword: "7bPuBFxb5LZfhx6PbPyLKLvzruF2m3rM"
        })
        const  User6 = await User.query().insert({
            userName: "Therasia",
            email: "therasia@email.com",
            cryptedPassword: "S287WAdfz5cVJTyDxHmKemNSCd4phGYC"
        })
        const  User7 = await User.query().insert({
            userName: "Allan",
            email: "allan@email.com",
            cryptedPassword: "YhjZXuUdjGrUNXFVtyHhYStkBf3eZjbA"
        })
        const  User8 = await User.query().insert({
            userName: "Ntombizo",
            email: "ntombizodwa@email.com",
            cryptedPassword: "tRTF8nZa4UnnJjbWDs6bZkWvsAdftfDu"
        })
        const  User9 = await User.query().insert({
            userName: "Marjo",
            email: "marjo@email.com",
            cryptedPassword: "SdBKFrsPKTF3zS8mtQWBUHQhshSXRg8P"
        })
        const  User10 = await User.query().insert({
            userName: "Judith",
            email: "judith@email.com",
            cryptedPassword: "K6wLcvmmAP9gkxrjjgtfZTPq4xdaArsH"
        })
        const  User11 = await User.query().insert({
            userName: "Bodil",
            email: "bodil@email.com",
            cryptedPassword: "EdkcRXxBR2ZaT5vjFATCpAWBgJJtxNtX"
        })
        const  User12 = await User.query().insert({
            userName: "Nirav",
            email: "nirav@email.com",
            cryptedPassword: "UTPcx8bEQNfDG7j7tkpfaENRHghVnAW4"
        })
        const  User13 = await User.query().insert({
            userName: "Cathy",
            email: "catharine@email.com",
            cryptedPassword: "wFnc5FcUGavCaRX3VbGvhPY3MXULcgqk"
        })
        const  User14 = await User.query().insert({
            userName: "Dallas",
            email: "dallas@email.com",
            cryptedPassword: "SqRNSSuJGHZdQFKENf4KdPeXShqCgKqZ"
        })
        const  User15 = await User.query().insert({
            userName: "Bor",
            email: "bor@email.com",
            cryptedPassword: "5g6VHGNHQRch2nQ66UG2BtA3SjHSUHvf"
        })
    }
}

export default UserSeeder