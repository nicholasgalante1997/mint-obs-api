import { IController, IModel, Option, ReadOptions } from '@/types';

class Controller<DTO, M extends IModel<DTO>> implements IController<DTO, M> {
  model: M;

  constructor(model: M) {
    this.model = model;
  }
  async create(dto: DTO): Promise<Option<DTO>> {
    return this.model.create(dto);
  }
  async read(ro: ReadOptions): Promise<Option<DTO | DTO[]>> {
    return ro.multiple ? this.model.getOne(ro) : this.model.getAll(ro);
  }
  async readAll(): Promise<Option<DTO[]>> {
    return this.model.getAll();
  }
  async delete(dto: DTO): Promise<Option<unknown>> {
    return this.model.delete(dto);
  }
}

export { Controller };
