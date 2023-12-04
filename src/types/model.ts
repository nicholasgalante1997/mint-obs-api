import { ReadOptions } from './controller';
import { Option } from './option';

interface IModel<DTO> {
  name: string;
  getOne(ro: ReadOptions): Promise<Option<DTO | DTO[]>>;
  getAll(ro?: ReadOptions): Promise<Option<DTO[]>>;
  create(dto: DTO): Promise<Option<DTO>>;
  delete(dto: DTO): Option<{}>;
}

export { IModel };
