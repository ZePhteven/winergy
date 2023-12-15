import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { BaseController } from 'src/shared/controllers';
import { BaseFilter } from 'src/shared/models/dto';

import { CreateNoteDto, UpdateNoteDto } from './dto';
import { NoteEntity } from './entities';
import { NotesService } from './notes.service';

@ApiTags('Notes')
@Controller({
  path: 'notes',
  version: '1',
})
export class NotesController extends BaseController<BaseFilter, NoteEntity> {
  constructor(protected readonly _service: NotesService) {
    super(_service);
  }

  @Post()
  public create(@Body() createNoteDto: CreateNoteDto): Promise<NoteEntity> {
    return this._service.create(createNoteDto);
  }

  @Get(':id')
  public findOne(@Param('id') id: string): Promise<NoteEntity> {
    return this._service.get(+id);
  }

  @Put(':id')
  public update(@Param('id') id: string, @Body() updateNoteDto: UpdateNoteDto): Promise<void> {
    return this._service.update(+id, updateNoteDto);
  }

  @Delete(':id')
  public remove(@Param('id') id: string): Promise<void> {
    return this._service.remove(+id);
  }
}
