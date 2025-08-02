// src/config/database/prisma.service.ts
import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import { PrismaClient, Prisma } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient<
    Prisma.PrismaClientOptions,
    'query' | 'info' | 'warn' | 'error'
> implements OnModuleInit, OnModuleDestroy {
    private readonly logger = new Logger(PrismaService.name);

    constructor() {
        super({
            log: [
                {
                    emit: 'event',
                    level: 'query',
                },
                {
                    emit: 'event',
                    level: 'error',
                },
                {
                    emit: 'event',
                    level: 'info',
                },
                {
                    emit: 'event',
                    level: 'warn',
                },
            ],
        });
    }

    async onModuleInit() {
        // Eventos de logging con tipos correctos
        this.$on('query', (e: Prisma.QueryEvent) => {
            this.logger.log(`Query: ${e.query}`);
            this.logger.log(`Params: ${e.params}`);
            this.logger.log(`Duration: ${e.duration}ms`);
        });

        this.$on('error', (e: Prisma.LogEvent) => {
            this.logger.error(`Target: ${e.target} - Message: ${e.message}`);
        });

        this.$on('info', (e: Prisma.LogEvent) => {
            this.logger.log(`Target: ${e.target} - Message: ${e.message}`);
        });

        this.$on('warn', (e: Prisma.LogEvent) => {
            this.logger.warn(`Target: ${e.target} - Message: ${e.message}`);
        });

        await this.$connect();
        this.logger.log('Connected to database');
    }

    async onModuleDestroy() {
        await this.$disconnect();
        this.logger.log('Disconnected from database');
    }

    async cleanDatabase() {
        if (process.env.NODE_ENV === 'production') return;

        const models = Reflect.ownKeys(this).filter(key => key[0] !== '_');

        return Promise.all(
            models.map((modelKey) => this[modelKey].deleteMany())
        );
    }
}