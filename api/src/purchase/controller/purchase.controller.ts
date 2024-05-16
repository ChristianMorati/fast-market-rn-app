import { Body, Controller, Get, HttpStatus, Param, Post, Res } from '@nestjs/common';
import { PurchaseService } from '../service/purchase.service';
import { Response } from 'express';
import z from "zod";

type allPurchasesDTO = {
    userId: number
}

type lastPurchaseDTO = {
    userId: number
}

@Controller('purchase')
export class PurchaseController {
    constructor(
        private purchaseService: PurchaseService
    ) { }

    @Get('/all/:userId')
    findAll(@Param() params: allPurchasesDTO) {

        const purchaseIdParam = z.object({
            userId: z.string()
        })

        try {
            const { userId } = purchaseIdParam.parse(params);
            return this.purchaseService.findAll(parseInt(userId));
        } catch (err) {
            console.log(err.message);
        }
    }

    @Get('/last/:userId')
    lastPurchase(@Param() params: lastPurchaseDTO) {
        const { userId } = params
        return this.purchaseService.lastPurchase(userId);
    }

    @Post('/create')
    async createOrder(@Body() order: any, @Res() res: Response) {
        const purchase = await this.purchaseService.createPurchase(order)
        res.status(HttpStatus.CREATED).json(purchase).send();
    }
}