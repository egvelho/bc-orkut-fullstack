import { ScrapRepository } from "./scrap.repository";
import { CreateScrapDto } from "./dtos/create-scrap.dto";
import { UpdateScrapDto } from "./dtos/update-scrap.dto";

export class ScrapService {
  constructor() {
    this.scrapRepository = new ScrapRepository();
  }

  scrapRepository: ScrapRepository;

  async readScrap(id: string) {
    const scrap = this.scrapRepository.readScrap(id);
    return scrap;
  }

  async listOwnerScraps(ownerId: number) {
    const scraps = await this.scrapRepository.listOwnerScraps(ownerId);
    return scraps;
  }

  async createScrap(createScrapDto: CreateScrapDto) {
    const scrap = await this.scrapRepository.createScrap(createScrapDto);
    return scrap;
  }

  async updateScrap(id: string, updateScrapDto: UpdateScrapDto) {
    const scrap = await this.scrapRepository.updateScrap(id, updateScrapDto);
    return scrap;
  }

  async deleteScrap(id: string) {
    const scrap = await this.scrapRepository.deleteScrap(id);
    return scrap;
  }
}
