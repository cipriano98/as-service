import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { APP_GUARD } from '@nestjs/core'
import { AuthModule } from './modules/auth/auth.module'
import { JwtAuthGuard } from './modules/auth/guards/jwt/jwt-auth.guard'
import { DatabaseModule } from './modules/database/database.module'
import { ClinicModule } from './resources/clinic/clinic.module'
import { MedicalSpecialityModule } from './resources/medical-speciality/medical-speciality.module'
import { RegionModule } from './resources/region/region.module'
import { UserModule } from './resources/user/user.module'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    UserModule,
    AuthModule,
    ClinicModule,
    RegionModule,
    MedicalSpecialityModule
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard
    }
  ]
})
export class AppModule {}
