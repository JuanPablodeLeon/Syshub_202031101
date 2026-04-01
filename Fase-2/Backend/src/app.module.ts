import { Module } from '@nestjs/common';
import { CarrerasModule } from './carreras/carreras.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuariosModule } from './usuarios/usuarios.module';


@Module({
  imports: [
    CarrerasModule,
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "127.0.0.1",
      port: 3307,
      username: "user_syshub",
      password: "root_syshub",
      database: "syshub_db_crud",
      autoLoadEntities: true,
      synchronize: true, //en produccion volver false
    }),
    UsuariosModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
