import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Patch,
  Delete,
  ParseUUIDPipe,
  NotFoundException,
} from '@nestjs/common';
import { ItemsService } from './items.service';
import { Item } from './item.model';
import { CreateItemDto } from './dto/create-item.dto';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}
  @Get()
  findAll(): Item[] {
    return this.itemsService.findAll();
  }

  @Get(':id')
  findById(@Param('id', ParseUUIDPipe) id: string): Item {
    const found = this.itemsService.findById(id);
    if (!found) {
      throw new NotFoundException();
    }
    return found;
  }

  @Post()
  create(@Body() createItemDto: CreateItemDto): Item {
    return this.itemsService.create(createItemDto);
  }

  @Patch(':id')
  updateStatus(@Param('id', ParseUUIDPipe) id: string) {
    return this.itemsService.updateStatus(id);
  }

  @Delete(':id')
  delete(@Param('id', ParseUUIDPipe) id: string) {
    this.itemsService.delete(id);
  }
}
