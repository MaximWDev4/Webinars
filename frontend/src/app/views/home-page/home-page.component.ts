import {AfterViewInit, Component, ElementRef, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {AuthService} from '../../_services/auth.service';
import {SearchService} from '../../_services/search.service';
import {SuccessService} from '../../_services/success.service';
import {ErrorService} from '../../_services/error.service';
import {WebinarService} from '../../_services/webinar.service';
import {Common} from '../../_helpers/common.helper';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss' ],
})
export class HomePageComponent implements OnInit, AfterViewInit {
  public webinar: any;
  id = 0;

  constructor(
    private element: ElementRef,
    private route: ActivatedRoute,
    private authService: AuthService,
    private searchService: SearchService,
    private success: SuccessService,
    private error: ErrorService,
    private router: Router,
    private webinarService: WebinarService
  ) {

    this.route.params.subscribe(params => {
      this.id = +params.id;
      if (this.id !== 0) {
        this.webinarService.getWebinarById(this.id).subscribe(body => {
          if (body.success) {
            this.webinar = body.data;
          } else {
            router.navigate(['404']);
          }
        },
          e => {
              error.errorChange('К сожалению, этого вебинара не существует.\n Перенапраыляем на главную...');
              router.navigate(['home', '0']);
          });
      } else {
        this.webinar = {
          id: 0,
        };
      }
    });
  }
  program = [
    {title: 'Урок 1', text: 'Что такое MICE?'},
    {title: 'Урок 2', text: 'Деловая переписка. Правила Разговора по телефону.'},
    {title: 'Урок 3', text: 'Расстановка в зале - SET UP'},
    {title: 'Урок 4', text: 'Этапы организации мероприятия.'},
    {title: 'Урок 5', text: 'Шаблоны заявок.'},
    {title: 'Урок 6', text: 'Смета - Самый важный документ!'},
    {title: 'Урок 7', text: 'Программа мероприятия.'},
    {title: 'Урок 8', text: 'Как выбрать место Проведения для мероприятия.'},
    {title: 'Урок 9', text: 'Ценообразование.'},
    {title: 'Урок 10', text: 'Отношения, поставщики, команда. Настройки и ответственность.'},
    {title: 'Урок 11', text: 'Авиабилеты.'},
    {title: 'Урок 12', text: 'Логистика.'},
    {title: 'Урок 13', text: 'Оборудование на мероприятии.'},
    {title: 'Урок 14', text: 'Кэйтеринг.'},
    {title: 'Урок 15', text: 'Зарубежные мероприятия, поездки. Партнеры за рубежом.'},
    {title: 'Урок 16', text: 'Разылекательные мероприятия.'},
    {title: 'Урок 17', text: 'Тимбилдинги.'},
    {title: 'Урок 18', text: 'Разбор мероприятий.'},
    {title: 'Урок 19', text: 'Онлайн мероприятия.'},
  ];
  spikier = 'assets/spikier_1.jpg';
  spikierText = 'Почему я создала  школу event-менеджера?<br>- Организации мероприятий не учат в учебных заведениях, хотя - это современная, востребованная профессия. <br>- Сейчас, все больше людей и компаний доверяют профессионалам организацию своего мероприятия. <br>- Я хочу создать больше профессионалов в этом секторе  профессий! ';
  navBarElements = [];

  slides = [
    { background: 'slider-back-1.jpg',
      title: 'Хочешь научиться профессионально организовывать мероприятия? ',
      subtitle: 'Скорее записывайся на мой курс по подготовке организатора мероприятий в event школу.'
    },
    { background: 'slider-back-2.jpg',
      title: 'Конференции, семинары, банкеты, свадьбы, дни рождения...',
      subtitle: 'orem ipsum dolor sit amet, consectetur adipisicing'
    },
    { background: 'slider-back-3.jpg',
      title: 'Организации мероприятий не учат в учебных заведениях, хотя - это современная, востребованная профессия. ',
      subtitle: 'Сейчас, все больше людей и компаний доверяют профессионалам организацию своего мероприятия. '
    }
  ];
  pros = [
    {
      header: 'Что будет на курсе?',
      body: 'На этом курсе будут затронуты все аспекты организации мероприятия: <br>-  вы пройдете  все этапы  организации,  начиная от получения запроса,  подбора  места проведения и заканчивая  контролем мероприятия, <br>-  вы научитесь грамотно составлять сметы,  <br>-  научитесь понимать весь процесс от начала и до конца; <br>-  узнаете  что такое логистика и как правильно все организовать,<br>-  научитесь составлять программы, <br>-  научитесь правильно вести переговоры как с клиентами,  так и с поставщиками, <br>-  узнаете о том что такое онлайн мероприятия, как их можно организовать, <br> и еще много полезного. '
    },
    {
      header: 'Какие бонусы выполучите?',
      body: 'Чек-листы, образцы смет, образцы программ и другие важные документы, необходимые организатору мероприятий.'
    },
    {
      header: 'Для кого подойдет этот курс?',
      body: '- для тех, кто хочет открыть для себя мир event индустрии.<br>- для тех,  кто просто хочет научиться  ремеслу организатора мероприятий.<br>- для всех, кто хочет знать как это все происходит изнутри.<br>- для тех, кто хочет сам контролировать процесс организации своих мероприятий.<br>- для тех, кто любит общаться, посещать разные места.<br>- для тех, кто не знает куда деть свою врожденную ответственность, креативность, энергию; <br>- для тех, кому нравятся нестандартные решения и для тех, кто не любит сидеть на месте.<br>- для тех, кто хочет расширить свой круг знакомств и свой кругозор.<br>- для всех, кто хочет сменить сферу деятельности, обрести новую профессию и зарабатывать на этом деньги.'
    },
    {
      header: 'Что вы будете уметь после окончания курса?',
      body: 'Сможете организовать любое мероприятие:<br>      ● от собственного дня рождения, до свадьбы любимой племянницы, <br>      ● от небольшого семинара до масштабной конференции.<br> Узнаете много креативных идей, сможете легко считать и составлять сметы.<br> Научитесь быстро договариваться и грамотно контролировать поставщиков.<br> Спокойно решать экстренные ситуации'
    },
  ];

  ngOnInit(): void {
    this.navBarElements.push(
    {
      name: 'Главная',
      routerLink: '/home/' + this.id,
      fragment: 'top'
    },
    {
      name: 'О нас',
      routerLink: '/home/' + this.id,
      fragment: 'about'
    });
    if (this.id !== 0) {
      this.navBarElements.push({
        name: 'Зарегистрироваться',
        routerLink: '/home/' + this.id,
        fragment: 'signup',
      });
    }

  }

  ngAfterViewInit(): void {
    this.route.fragment.subscribe((fragment: string) => {
      const el = this.element.nativeElement.querySelector( fragment ? '#' + fragment : '#top');
      console.log(fragment ? '#' + fragment : '#top');
      el.scrollIntoView();
    });
  }

  exit(): void {
    this.authService.logoutUser();
    this.router.navigate(['login']);
  }

  isLoggedIn(): string {
    return this.authService.isLoggedIn() ? 'Выход( ' + localStorage.getItem('userName') + ' )' : 'Вход';
  }

  onSubmin(form: any): void {
    this.searchService.sendPotentialListener(form).subscribe((api: any) => {
      if (api.success) {
        this.success.successChange('Вы удачно записались на вебинар');
      } else {
        this.error.errorChange(('Что-то пошло не так, попробуйте позже'));
      }
    });
  }

  getTime(startTime: number): string {
    return Common.timeConverter(+startTime);
  }

  openWhatsappModal(): void {
    window.open('https://wa.me/77071170179/?text=%D0%94%D0%BE%D0%B1%D1%80%D1%8B%D0%B9%20%D0%B4%D0%B5%D0%BD%D1%8C%2C%20%20%D0%BC%D0%BE%D0%B3%D1%83%20%D1%8F%20%D1%83%D0%B7%D0%BD%D0%B0%D1%82%D1%8C%20%D0%BE%20%D0%BA%D1%83%D1%80%D1%81%D0%B5%20%20%20%D0%BF%D0%BE%D0%B4%D1%80%D0%BE%D0%B1%D0%BD%D0%B5%D0%B5%3F%20', '_blank');
  }
  openTG(): void {
    window.open('https://t.me/event_school1', '_blank');
  }
}

