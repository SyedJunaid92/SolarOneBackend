import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './components/User/user.module';
import { ProductModule } from './components/Product/product.module';
import { CustomerModule } from './components/Customer/customer.module';
import { SaleModule } from './components/Sale/sale.module';
import { ProductOfModule } from './components/ProductOf/productOf.module';
import { InventoryModule } from './components/Inventory/inventory.module';

@Module({
  imports: [UserModule,ProductModule,CustomerModule,SaleModule,ProductOfModule,InventoryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
