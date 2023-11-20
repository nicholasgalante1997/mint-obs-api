import { IController, IModel, Option, ReadOptions } from '@/types';

class Controller<DTO, M extends IModel<DTO>> implements IController<DTO, M> {
  model: M;

  constructor(model: M) {
    this.model = model;
  }
  create(dto: DTO): Option<DTO> {
    return this.model.create(dto);
  }
  read(ro: ReadOptions): Option<DTO | DTO[]> {
    return ro.multiple ? this.model.getOne(ro) : this.model.getAll(ro);
  }
  readAll(): Option<DTO[]> {
    return this.model.getAll();
  }
  delete(dto: DTO): Option<unknown> {
    return this.model.delete(dto);
  }
}

export { Controller };
