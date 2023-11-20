import { ReadOptions } from './controller';
import { Option } from './option';

interface IModel<DTO> {
  name: string;
  getOne(ro: ReadOptions): Option<DTO>;
  getAll(ro?: ReadOptions): Option<DTO[]>;
  create(dto: DTO): Option<DTO>;
  delete(dto: DTO): Option<{}>;
}

export { IModel };
