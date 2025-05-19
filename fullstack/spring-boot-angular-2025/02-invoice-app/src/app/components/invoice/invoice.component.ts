import { Component, OnInit } from '@angular/core';
import { InvoiceService } from '../../services/invoice.service';
import { Invoice } from '../../models';

@Component({
  selector: 'app-invoice',
  standalone: true,
  imports: [],
  templateUrl: './invoice.component.html',
})
export class InvoiceComponent implements OnInit {
  data!: Invoice;
  constructor(private invoiceService: InvoiceService) {}

  ngOnInit(): void {
    this.data = this.invoiceService.getInvoice();
  }
}
