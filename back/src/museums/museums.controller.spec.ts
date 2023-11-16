import { Test, TestingModule } from '@nestjs/testing';
import { MuseumsController } from './museums.controller';
import { MuseumsService } from './museums.service';
import { Museum } from './schemas/museum.schema';
import { getModelToken } from '@nestjs/mongoose';

const mockMuseums = [
  {
    name: 'Arxiu Fotogr\u00e0fic de Barcelona',
    use_type: "Centres d'exposicions",
    equipment_type: 'Arxius i biblioteques patrimonials',
    ambit: 'Hist\u00f2ria i mem\u00f2ria',
    latitude: 41.38687264,
    longitude: 2.181806284,
  },
  {
    name: 'Bas\u00edlica de la Sagrada Fam\u00edlia',
    use_type: 'Centres patrimonials',
    equipment_type: "Espais d'inter\u00e8s patrimonial",
    ambit: 'Hist\u00f2ria i mem\u00f2ria',
    latitude: 41.403188985,
    longitude: 2.174826626,
  },
];

describe('MuseumsController', () => {
  let controller: MuseumsController;
  const mockMuseumsService = {
    findAll: jest.fn().mockReturnValue(Promise.resolve(mockMuseums)),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MuseumsController],
      providers: [
        MuseumsService,
        {
          provide: getModelToken(Museum.name),
          useValue: {},
        },
      ],
    })
      .overrideProvider(MuseumsService)
      .useValue(mockMuseumsService)
      .compile();

    controller = module.get<MuseumsController>(MuseumsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('Should return an array of museum objects', async () => {
    expect(await controller.findAll()).toMatchObject(mockMuseums);
  });
});
