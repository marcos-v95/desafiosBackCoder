import DaosFactory from "../dao/factory.js";
import config from "../config/dotenv.config.js";

class TicketRepository {
  constructor() {
    this.dao = DaosFactory.createTickets(config.DAO)
  }

  async createTicket(newTicket) {
    return await this.dao.saveData(newTicket)
  }
}

export default TicketRepository