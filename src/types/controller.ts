import { Option } from './option';
import { IModel } from './model';

type ReadOptions = {
  key: string;
  value: any;
  multiple?: boolean;
};

interface IController<DTO = any, M = IModel<DTO>> {
  model: M;
  read(ro: ReadOptions): Promise<Option<DTO | DTO[]>>;
  readAll(): Promise<Option<DTO[]>>;
  create(dto: DTO): Promise<Option<DTO>>;
  delete(dto: DTO): Promise<Option<unknown>>;
}

export { ReadOptions, IController };
