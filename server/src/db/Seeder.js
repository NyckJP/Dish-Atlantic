/* eslint-disable no-console */
import { connection } from "../boot.js"

import UserSeeder from "./seeders/UserSeeder.js"
import ReviewSeeder from "./seeders/ReviewSeeder.js"
import HelpfulVoteSeeder from "./seeders/HelpfulVotesSeeder.js"

class Seeder {
  static async seed() {
    console.log("Seeding users...")
    await UserSeeder.seed()

    console.log("Seeding reviews...")
    await ReviewSeeder.seed()

    console.log("Seeding helpful votes...")
    await HelpfulVoteSeeder.seed()

    console.log("Done!")
    await connection.destroy()
  }
}

export default Seeder