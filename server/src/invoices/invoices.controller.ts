import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guard/jwt.guard';
import { InvoicesService } from './invoices.service';

@UseGuards(JwtAuthGuard)
@Controller('invoices')
export class InvoicesController {
  constructor(private invoices: InvoicesService) {}

  @Get()
  async getInvoices(@Req() request: { user: { sub: string } }) {
    return await this.invoices.getInvoices(request.user.sub);
  }

  @Get(':id')
  async getInvoice(
    @Param('id') id: string,
    @Req() request: { user: { sub: string } }
  ) {
    return await this.invoices.getInvoice(id, request.user.sub);
  }
}
