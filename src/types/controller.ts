import { Option } from './option';
import { IModel } from './model';

type ReadOptions = {
  key: string;
  value: any;
  multiple?: boolean;
};

interface IController<DTO = any, M = IModel<DTO>> {
  model: M;
  read(ro: ReadOptions): Option<DTO | DTO[]>;
  readAll(): Option<DTO[]>;
  create(dto: DTO): Option<DTO>;
  delete(dto: DTO): Option<unknown>;
}

export { ReadOptions, IController };
