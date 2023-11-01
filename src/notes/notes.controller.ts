import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { NoteEntity } from './entities';
import { NotesService } from './notes.service';

@ApiTags('Notes')
@Controller('notes')
export class NotesController {
  constructor(private readonly _service: NotesService) {}

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
