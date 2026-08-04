import { useEffect, useMemo, useRef, useState } from 'react'
import {
  ArrowLeft, ArrowRight, ArrowUp, ArrowUpRight, Award, CalendarPlus,
  Check, ChevronDown, Clock, Crown, Instagram, MapPin, Menu, Music2,
  Phone, Scissors, ShieldCheck, Smartphone, Star, X
} from 'lucide-react'

type Service = {
  id: string; title: string; subtitle: string; description: string;
  duration: number; steps: string; price: number; barbers: string[]
}
type Barber = {
  id: string; name: string; experience: string; bio: string; specialty: string;
  tools: string[]; rating: string; image: string
}
type Certificate = { id: string; name: string; price: number; description: string }

const navItems = [
  ['О нас', '#about'], ['Акции', '#offers'], ['Услуги', '#booking'],
  ['Барберы', '#booking'], ['Отзывы', '#reviews'], ['FAQ', '#faq'],
  ['Соцсети', '#socials'], ['Сертификаты', '#certificates'], ['Контакты', '#contacts']
]

const services: Service[] = [
  {
    id: 'long', title: 'Длинная форма', subtitle: 'Архитектура длины',
    description: 'Для волос ниже ушей: консультация, построение формы, работа ножницами, текстурирование и персональная укладка.',
    duration: 90, steps: 'консультация → мытьё → форма → текстура → укладка', price: 3600,
    barbers: ['ilya', 'mark', 'nikita']
  },
  {
    id: 'medium', title: 'Средняя длина', subtitle: 'Баланс и движение',
    description: 'Форма для волос средней длины с контролем объёма и естественным переходом.',
    duration: 70, steps: 'консультация → мытьё → основная форма → текстура → укладка', price: 3000,
    barbers: ['artem', 'ilya', 'mark']
  },
  {
    id: 'short', title: 'Короткая стрижка', subtitle: 'Чистый контур',
    description: 'Точная короткая форма, fade или классическая геометрия с аккуратной окантовкой.',
    duration: 50, steps: 'консультация → машинка и ножницы → переходы → контур → укладка', price: 2400,
    barbers: ['artem', 'mark', 'denis']
  },
  {
    id: 'kids', title: 'Детская стрижка', subtitle: 'Первый стиль',
    description: 'Спокойная и аккуратная стрижка для гостей от 5 до 12 лет с учётом характера волос и пожеланий ребёнка.',
    duration: 40, steps: 'знакомство → выбор формы → стрижка → лёгкая укладка', price: 1800,
    barbers: ['denis', 'artem', 'ilya']
  }
]

const barbers: Barber[] = [
  { id: 'artem', name: 'Артём Волков', experience: '9 лет', rating: '4.9', bio: 'Точные формы, спокойная консультация и внимание к деталям.', specialty: 'Короткие и средние стрижки, fade', tools: ['машинка', 'шейвер', 'прямые ножницы', 'филировочные ножницы'], image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=85' },
  { id: 'ilya', name: 'Илья Громов', experience: '7 лет', rating: '4.9', bio: 'Работает с естественной текстурой и формами, которые легко укладывать дома.', specialty: 'Средние и длинные волосы', tools: ['прямые ножницы', 'филировочные ножницы', 'брашинг', 'диффузор'], image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=900&q=85' },
  { id: 'mark', name: 'Марк Ли', experience: '11 лет', rating: '5.0', bio: 'Соединяет классическую геометрию и современные силуэты.', specialty: 'Короткие, средние и длинные стрижки', tools: ['ножницы', 'машинка', 'бритва', 'текстурирующий инструмент'], image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=900&q=85' },
  { id: 'denis', name: 'Денис Орлов', experience: '6 лет', rating: '4.8', bio: 'Легко находит общий язык с детьми и делает аккуратные практичные формы.', specialty: 'Детские и короткие стрижки', tools: ['тихая машинка', 'безопасные ножницы', 'триммер'], image: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&w=900&q=85' },
  { id: 'nikita', name: 'Никита Рэй', experience: '8 лет', rating: '4.9', bio: 'Любит сложные формы, мягкие слои и выразительную укладку.', specialty: 'Средние и длинные стрижки', tools: ['ножницы', 'слайсер', 'фен', 'брашинг', 'диффузор'], image: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=900&q=85' }
]

const promos = [
  { id: 'birthday', title: 'День рождения', discount: '−45%', copy: 'За три дня до и после даты рождения.', detail: 'Возьмите с собой удостоверяющий документ, подтверждающий дату рождения.' },
  { id: 'father', title: 'Папа + сын', discount: '−15%', copy: 'Совместная запись в один день.', detail: 'Добавьте вторую запись: услугу, барбера, дату и время для ребёнка.' },
  { id: 'friend', title: 'Приведи друга', discount: '−500 ₽', copy: 'Скидка на следующую стрижку после визита друга.', detail: 'После оплаты ваш друг должен назвать администратору ваш номер телефона.' },
  { id: 'first', title: 'Первый CUT', discount: '−20%', copy: 'Скидка на первое посещение.', detail: 'Система проверит первое посещение по указанному номеру телефона.' }
]
// Демонстрационная локальная база: в реальном проекте статус первого визита
// должен проверяться на защищённом сервере системы записи.
const existingGuestPhones = ['79991234567', '79161234567', '79857774411']
const simpleServices = ['Мужская стрижка', 'Детская стрижка', 'Моделирование бороды', 'Бритьё', 'Укладка', 'Уход за лицом', 'Камуфляж седины', 'Уход за волосами и кожей головы']
const extras = [
  ['wax', 'Воск: нос и уши', 500], ['beard', 'Моделирование бороды', 1500],
  ['gray', 'Камуфляж седины', 1700], ['detox', 'Детокс кожи головы и массаж', 1200],
  ['face', 'Уход за лицом и чёрная маска', 1400], ['brow', 'Коррекция бровей', 500],
  ['towel', 'Горячее полотенце и финишный уход', 600]
] as const
const extraServices: Service[] = [
  { id: 'extra-wax', title: 'Воск: нос и уши', subtitle: 'Чистый контур', description: 'Быстрая и деликатная процедура для аккуратного результата.', duration: 15, steps: 'консультация → подготовка → процедура → финиш', price: 500, barbers: ['artem', 'mark', 'denis'] },
  { id: 'extra-beard', title: 'Моделирование бороды', subtitle: 'Форма и контур', description: 'Подбор формы, точная геометрия и аккуратный финиш.', duration: 40, steps: 'консультация → форма → контур → уход', price: 1500, barbers: ['artem', 'mark', 'denis'] },
  { id: 'extra-gray', title: 'Камуфляж седины', subtitle: 'Естественный тон', description: 'Мягкое выравнивание оттенка без эффекта плотного окрашивания.', duration: 45, steps: 'подбор тона → нанесение → выдержка → уход', price: 1700, barbers: ['artem', 'ilya', 'mark'] },
  { id: 'extra-detox', title: 'Детокс кожи головы и массаж', subtitle: 'Перезагрузка', description: 'Глубокое очищение кожи головы и расслабляющий массаж.', duration: 30, steps: 'диагностика → очищение → массаж → уход', price: 1200, barbers: ['ilya', 'mark', 'nikita'] },
  { id: 'extra-face', title: 'Уход за лицом и чёрная маска', subtitle: 'Чистая кожа', description: 'Очищение, чёрная маска и спокойный завершающий уход.', duration: 35, steps: 'очищение → маска → снятие → увлажнение', price: 1400, barbers: ['artem', 'mark', 'nikita'] },
  { id: 'extra-brow', title: 'Коррекция бровей', subtitle: 'Точный акцент', description: 'Аккуратная коррекция естественной формы без лишней графичности.', duration: 15, steps: 'оценка формы → коррекция → финиш', price: 500, barbers: ['artem', 'mark', 'denis'] },
  { id: 'extra-towel', title: 'Горячее полотенце и финишный уход', subtitle: 'Спокойный финиш', description: 'Горячее полотенце и завершающий уход для кожи.', duration: 20, steps: 'подготовка → горячее полотенце → уход → финиш', price: 600, barbers: ['artem', 'ilya', 'mark'] }
]
const bookingServices = [...services, ...extraServices]
const timeSlots = ['10:00', '11:30', '13:00', '14:30', '16:00', '17:30', '19:00', '20:30']
const busySlots = [[1, 4, 6], [0, 3], [2, 5, 7], [1, 6], [0, 4, 7], [2, 3], [1, 5, 7]]
const reviews = [
  { name: 'Антон', rating: 5, service: 'Средняя длина', date: '24.07.2026', text: 'Илья показал два движения с феном — впервые дома получилось почти так же, как в кресле.' },
  { name: 'Михаил', rating: 5, service: 'Длинная форма', date: '18.07.2026', text: 'Длину сохранили, но волосы наконец перестали жить отдельной жизнью. Очень точная работа со слоями.' },
  { name: 'Елена', rating: 5, service: 'Детская стрижка', date: '11.07.2026', text: 'Сын спокойно высидел весь сеанс. Денис разговаривал с ним нормально, без сюсюканья и спешки.' },
  { name: 'Роман', rating: 5, service: 'Короткая стрижка', date: '03.07.2026', text: 'Прошло три недели, fade отрастает ровно и всё ещё выглядит собранно. Для меня это главный тест.' },
  { name: 'Алексей', rating: 5, service: 'Консультация + CUT', date: '27.06.2026', text: 'Марк честно объяснил, что мне не нужен лишний уход. Подобрали форму без навязывания и суеты.' }
]
const faqs = [
  ['Нужно ли мыть голову перед визитом?', 'Не обязательно. Мы помоем волосы перед стрижкой и оценим их естественное состояние.'],
  ['Как понять, какая длина мне подходит?', 'Барбер учтёт форму лица, структуру волос и то, сколько времени вы готовы тратить на укладку.'],
  ['Можно ли показать барберу фотографию стрижки?', 'Да. Фото помогает понять направление, а форму мы адаптируем именно под вас.'],
  ['Что делать, если я опаздываю?', 'Позвоните нам. До 10 минут обычно не критично, при большей задержке предложим ближайшее окно.'],
  ['Можно ли записать ребёнка без взрослого?', 'Гостей до 14 лет просим приходить со взрослым хотя бы на консультацию перед стрижкой.'],
  ['Сколько держится результат?', 'Короткая форма — около 3–4 недель, средняя и длинная — 6–10 недель. Всё зависит от роста волос.'],
  ['Можно ли изменить или отменить запись?', 'Да, пожалуйста, предупредите нас минимум за три часа по телефону.'],
  ['Какие средства используются в работе?', 'Профессиональные продукты с понятным составом. Перед применением уточняем чувствительность и предпочтения.'],
  ['Суммируются ли скидки?', 'Нет, за один визит применяется одна, наиболее выгодная для вас акция.'],
  ['Можно ли прийти без записи?', 'Можно, если есть свободное окно. Но запись заранее гарантирует удобное время и выбранного барбера.']
]
const certificates: Certificate[] = [
  { id: 'one', name: 'CUT ONE', price: 3000, description: 'Сертификат на любую одну стрижку.' },
  { id: 'plus', name: 'CUT PLUS', price: 4500, description: 'Стрижка и одна дополнительная услуга на выбор.' },
  { id: 'full', name: 'CUT FULL', price: 6500, description: 'Стрижка, моделирование бороды или премиальный уход, детокс кожи головы и массаж.' }
]

const rub = (value: number) => `${value.toLocaleString('ru-RU')} ₽`
const digits = (value: string) => value.replace(/\D/g, '')
const maskPhone = (value: string) => {
  const d = digits(value).replace(/^8/, '7').slice(0, 11)
  const n = d.startsWith('7') ? d.slice(1) : d
  let out = '+7'
  if (n.length) out += ` (${n.slice(0, 3)}`
  if (n.length >= 3) out += ')'
  if (n.length > 3) out += ` ${n.slice(3, 6)}`
  if (n.length > 6) out += `-${n.slice(6, 8)}`
  if (n.length > 8) out += `-${n.slice(8, 10)}`
  return out
}
function SectionLine({ index, title }: { index: string; title: string }) {
  return <div className="section-line reveal"><span>{index}</span><span>—</span><span>{title}</span><i /></div>
}

function Counter({ value, suffix = '', decimals = 0 }: { value: number; suffix?: string; decimals?: number }) {
  const [shown, setShown] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  useEffect(() => {
    const node = ref.current
    if (!node) return
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      const start = performance.now()
      const run = (now: number) => {
        const p = Math.min((now - start) / 1200, 1)
        setShown(value * (1 - Math.pow(1 - p, 3)))
        if (p < 1) requestAnimationFrame(run)
      }
      requestAnimationFrame(run)
      observer.disconnect()
    }, { threshold: .4 })
    observer.observe(node)
    return () => observer.disconnect()
  }, [value])
  return <span ref={ref}>{shown.toFixed(decimals)}{suffix}</span>
}

export default function App() {
  const [introDone, setIntroDone] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [bookingStep, setBookingStep] = useState(1)
  const [serviceId, setServiceId] = useState('')
  const [barberId, setBarberId] = useState('')
  const [dayIndex, setDayIndex] = useState<number | null>(null)
  const [selectedTime, setSelectedTime] = useState('')
  const [guestName, setGuestName] = useState('')
  const [guestPhone, setGuestPhone] = useState('')
  const [guestComment, setGuestComment] = useState('')
  const [selectedExtras, setSelectedExtras] = useState<string[]>([])
  const [extrasPriceOpen, setExtrasPriceOpen] = useState(false)
  const [privacy, setPrivacy] = useState(false)
  const [bookingError, setBookingError] = useState('')
  const [booked, setBooked] = useState(false)
  const [calendarMenuOpen, setCalendarMenuOpen] = useState(false)
  const [selectedPromo, setSelectedPromo] = useState('')
  const [companionOpen, setCompanionOpen] = useState(false)
  const [companionStep, setCompanionStep] = useState(1)
  const [companionServiceId, setCompanionServiceId] = useState('')
  const [companionBarberId, setCompanionBarberId] = useState('')
  const [companionDayIndex, setCompanionDayIndex] = useState<number | null>(null)
  const [companionTime, setCompanionTime] = useState('')
  const [reviewIndex, setReviewIndex] = useState(0)
  const touchStart = useRef(0)
  const [openFaqs, setOpenFaqs] = useState<number[]>([0])
  const [certificate, setCertificate] = useState<Certificate | null>(null)
  const [certDone, setCertDone] = useState(false)
  const [buyerPhone, setBuyerPhone] = useState('')
  const [delivery, setDelivery] = useState<'sms' | 'email'>('sms')
  const [email, setEmail] = useState('')
  const [certConsent, setCertConsent] = useState(false)
  const [certError, setCertError] = useState('')

  const selectedService = bookingServices.find(s => s.id === serviceId)
  const selectedBarber = barbers.find(b => b.id === barberId)
  const companionService = services.find(s => s.id === companionServiceId)
  const companionBarber = barbers.find(b => b.id === companionBarberId)
  const activePromo = promos.find(p => p.id === selectedPromo)
  const normalizedGuestPhone = digits(guestPhone)
  const firstCutEligible = normalizedGuestPhone.length === 11 && !existingGuestPhones.includes(normalizedGuestPhone)
  const dates = useMemo(() => Array.from({ length: 7 }, (_, i) => {
    const date = new Date(); date.setHours(12, 0, 0, 0); date.setDate(date.getDate() + i)
    return date
  }), [])
  const baseTotal = (selectedService?.price ?? 0) + (selectedPromo === 'father' && companionService ? companionService.price : 0)
  const extrasTotal = extras.filter(([id]) => selectedExtras.includes(id)).reduce((sum, [, , price]) => sum + price, 0)
  const promoSaving = selectedPromo === 'birthday' ? Math.round((selectedService?.price ?? 0) * .45)
    : selectedPromo === 'father' && companionService ? Math.round(baseTotal * .15)
      : selectedPromo === 'friend' ? 500
        : selectedPromo === 'first' && firstCutEligible ? Math.round((selectedService?.price ?? 0) * .2) : 0
  const total = Math.max(baseTotal + extrasTotal - promoSaving, 0)

  const calendarEvent = useMemo(() => {
    if (dayIndex === null || !selectedTime || !selectedService || !selectedBarber) return null
    const [hours, minutes] = selectedTime.split(':').map(Number)
    const start = new Date(dates[dayIndex]); start.setHours(hours, minutes, 0, 0)
    const end = new Date(start.getTime() + selectedService.duration * 60_000)
    const fmt = (date: Date) => `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, '0')}${String(date.getDate()).padStart(2, '0')}T${String(date.getHours()).padStart(2, '0')}${String(date.getMinutes()).padStart(2, '0')}00`
    const title = `CUT — ${selectedService.title}`
    const description = `Барбер: ${selectedBarber.name}. Москва, улица Покровка, 19.`
    const google = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${fmt(start)}/${fmt(end)}&ctz=Europe%2FMoscow&details=${encodeURIComponent(description)}&location=${encodeURIComponent('Москва, улица Покровка, 19')}`
    const outlook = `https://outlook.live.com/calendar/0/deeplink/compose?subject=${encodeURIComponent(title)}&startdt=${encodeURIComponent(start.toISOString())}&enddt=${encodeURIComponent(end.toISOString())}&body=${encodeURIComponent(description)}&location=${encodeURIComponent('Москва, улица Покровка, 19')}`
    const ics = `data:text/calendar;charset=utf-8,${encodeURIComponent(`BEGIN:VCALENDAR\nVERSION:2.0\nBEGIN:VEVENT\nDTSTART:${fmt(start)}\nDTEND:${fmt(end)}\nSUMMARY:${title}\nDESCRIPTION:${description}\nLOCATION:Москва, улица Покровка, 19\nEND:VEVENT\nEND:VCALENDAR`)}`
    return { google, outlook, ics }
  }, [dayIndex, selectedTime, selectedService, selectedBarber, dates])

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setIntroDone(true); return }
    const timer = window.setTimeout(() => setIntroDone(true), 2100)
    return () => window.clearTimeout(timer)
  }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll(); window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen || certificate || !introDone ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen, certificate, introDone])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') { setMenuOpen(false); setCertificate(null) } }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('is-visible')
    }), { threshold: .12 })
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [bookingStep, booked])

  const chooseService = (id: string) => {
    if (serviceId !== id) { setBarberId(''); setDayIndex(null); setSelectedTime('') }
    if (id.startsWith('extra-')) setSelectedExtras(prev => prev.filter(extraId => `extra-${extraId}` !== id))
    setServiceId(id); setBookingStep(2)
  }
  const chooseBarber = (id: string) => {
    if (barberId !== id) { setDayIndex(null); setSelectedTime('') }
    setBarberId(id); setBookingStep(3)
  }
  const submitBooking = (e: React.FormEvent) => {
    e.preventDefault()
    if (selectedPromo === 'father' && (!companionServiceId || !companionBarberId || companionDayIndex === null || !companionTime)) {
      setBookingError('Для акции «Папа + сын» добавьте вторую запись.'); return
    }
    if (selectedPromo === 'father' && companionDayIndex === dayIndex && companionTime === selectedTime) {
      setBookingError('Записи папы и сына не могут быть на одно время. Выберите для сына другое окно.'); return
    }
    if (guestName.trim().length < 2 || digits(guestPhone).length !== 11 || !privacy) {
      setBookingError('Заполните имя, телефон и подтвердите согласие с политикой.'); return
    }
    if (selectedPromo === 'first' && !firstCutEligible) {
      setBookingError('Этот номер уже есть в системе. Акция «Первый CUT» доступна только новым гостям.'); return
    }
    setBookingError(''); setCalendarMenuOpen(false); setBooked(true)
  }
  const choosePromo = (id: string) => {
    setSelectedPromo(id)
    if (id !== 'father') setCompanionOpen(false)
  }
  const promoToBooking = (id: string) => {
    choosePromo(id); setBookingStep(dayIndex !== null && selectedTime ? 4 : barberId ? 3 : serviceId ? 2 : 1)
    window.setTimeout(() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' }), 20)
  }
  const extraToBooking = (id: string) => {
    const standaloneId = `extra-${id}`
    setSelectedExtras(prev => prev.filter(extraId => extraId !== id))
    setServiceId(standaloneId); setBarberId(''); setDayIndex(null); setSelectedTime('')
    setBooked(false); setCalendarMenuOpen(false); setBookingError(''); setBookingStep(2)
  }
  const openCertificate = (item: Certificate) => {
    setCertificate(item); setCertDone(false); setCertError(''); setBuyerPhone(''); setEmail(''); setCertConsent(false); setDelivery('sms')
  }
  const submitCertificate = (e: React.FormEvent) => {
    e.preventDefault()
    const valid = digits(buyerPhone).length === 11 && certConsent && (delivery === 'sms' || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    if (!valid) { setCertError('Проверьте контакт для доставки и подтвердите согласие с условиями.'); return }
    // Демо не принимает платёжные реквизиты. В production оплата должна открываться
    // на hosted payment page сертифицированного провайдера, а результат проверяться сервером.
    setCertError(''); setCertDone(true)
  }

  return (
    <div className={`min-h-screen overflow-x-hidden bg-ink text-bone font-inter ${introDone ? 'intro-complete' : 'intro-running'}`}>
      {!introDone && <div className="brand-intro" aria-hidden="true">
        <div className="intro-panel intro-panel-a" /><div className="intro-panel intro-panel-b" />
        <div className="intro-mark"><span>C</span><span>U</span><span>T</span><small>МОСКВА / 2026</small></div>
        <div className="intro-progress"><i /><span>ТОЧНОСТЬ В КАЖДОМ ДВИЖЕНИИ</span></div>
      </div>}
      <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
        <a href="#top" className="logo" aria-label="CUT — наверх">C<span>U</span>T</a>
        <nav className="desktop-nav" aria-label="Основная навигация">
          {navItems.map(([label, href]) => <a key={label} href={href}>{label}</a>)}
        </nav>
        <div className="header-actions">
          <a className="phone-link" href="tel:+74951202818">+7 495 120-28-18</a>
          <a className="header-cta" href="#booking">Записаться <ArrowUpRight size={16} /></a>
          <button className="menu-button" onClick={() => setMenuOpen(true)} aria-label="Открыть меню" aria-expanded={menuOpen}><Menu /></button>
        </div>
      </header>

      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`} aria-hidden={!menuOpen}>
        <div className="mobile-menu-head"><span className="logo">C<span>U</span>T</span><button onClick={() => setMenuOpen(false)} aria-label="Закрыть меню"><X size={30} /></button></div>
        <nav aria-label="Мобильная навигация">
          {navItems.map(([label, href], i) => (
            <a key={label} href={href} onClick={() => setMenuOpen(false)} style={{ transitionDelay: menuOpen ? `${100 + i * 70}ms` : '0ms' }}><span>0{i + 1}</span>{label}</a>
          ))}
        </nav>
        <a className="mobile-contact" href="tel:+74951202818">+7 (495) 120-28-18 <ArrowUpRight /></a>
      </div>

      <main>
        <section id="top" className="hero">
          <div className="hero-copy">
            <div className="hero-kicker animate-fade-up"><Crown size={16} /> 01 — HERO / МОСКВА</div>
            <div className="hero-brand animate-fade-up-delay-1">CUT<span>®</span></div>
            <h1 className="font-podium animate-fade-up-delay-1">ТВОЙ СТИЛЬ.<br /><em>НАШ CUT.</em></h1>
            <p className="hero-sub animate-fade-up-delay-2">Стрижки без шаблонов. Подбираем форму, длину и характер под тебя.</p>
            <blockquote className="animate-fade-up-delay-2">«Хорошая стрижка не меняет человека. Она показывает его точнее.»</blockquote>
            <div className="hero-buttons animate-fade-up-delay-3">
              <a className="btn-primary group" href="#booking">Выбрать стрижку <ArrowUpRight /></a>
            </div>
            <div className="hero-meta animate-fade-up-delay-4"><Award size={22} /><span>Москва / ежедневно<br />10:00–22:00</span></div>
          </div>
          <div className="hero-media animate-fade-in-delay">
            <img src="/cut-hero.png" alt="Барбер CUT делает стрижку клиенту в тёмном современном интерьере" />
            <div className="hero-gradient" /><div className="red-line" /><div className="blue-glow" />
            <div className="frame-number">001 / CUT SESSION</div>
          </div>
          <div className="scroll-note">SCROLL TO EXPLORE <ArrowRight size={14} /></div>
        </section>

        <section id="about" className="section about-section">
          <SectionLine index="02" title="ПОЧЕМУ CUT" />
          <div className="about-hero reveal">
            <div><span className="about-label">НАШ ПОДХОД / 01</span><h2>НЕ ПОТОК.</h2></div>
            <h2 className="about-outline">ФОРМА<br />ПОД ТЕБЯ.</h2>
          </div>
          <div className="about-statement reveal">
            <p>Сначала смотрим, как волосы живут каждый день: где держат объём, как ложатся без укладки и сколько времени ты готов тратить утром.</p>
            <blockquote>ТОЛЬКО ПОТОМ<br /><strong>БЕРЁМ ИНСТРУМЕНТ.</strong></blockquote>
          </div>
          <div className="stats-grid">
            <div className="stat reveal"><strong><Counter value={98} suffix="%" /></strong><span>довольных гостей</span></div>
            <div className="stat reveal"><strong><Counter value={34} /></strong><span>клиента в среднем за день</span></div>
            <div className="stat reveal"><strong><Counter value={4.9} decimals={1} /></strong><span>средняя оценка</span></div>
            <div className="stat reveal"><strong><Counter value={8} suffix=" лет" /></strong><span>опыта команды</span></div>
          </div>
          <div className="principles-grid">
            {[
              ['01', 'Форма', 'Черты лица, рост волос и привычный силуэт задают конструкцию.'],
              ['02', 'Точность', 'Каждый переход и контур выстроен чисто — без спешки и случайностей.'],
              ['03', 'После CUT', 'Показываем простую укладку, которую реально повторить дома.']
            ].map(([n, title, text]) => <article className="principle reveal" key={title}><span>{n}</span><h3>{title}</h3><p>{text}</p><ArrowUpRight /></article>)}
          </div>
        </section>

        <section id="offers" className="section offers-section">
          <SectionLine index="03" title="АКЦИИ И УСЛУГИ" />
          <div className="intro-grid reveal"><h2>ВЫГОДНЕЕ<br /><span>ВМЕСТЕ.</span></h2><p>Не усложняем условия. Выгода видна сразу — выбирайте подходящий повод.</p></div>
          <div className="promos-grid">
            {promos.map((promo, i) => <article key={promo.id} className={`promo-card reveal accent-${i % 2 ? 'blue' : 'red'}`}><span>0{i + 1}</span><div><h3>{promo.title}</h3><strong>{promo.discount}</strong><p>{promo.copy}</p></div><button className="promo-action" onClick={() => promoToBooking(promo.id)} aria-label={`Выбрать акцию «${promo.title}» и перейти к записи`}><ArrowUpRight /></button></article>)}
          </div>
          <div className="service-list reveal">
            <p>Короткий список / полный результат</p>
            <div>{simpleServices.map((item, i) => <span key={item}><b>{String(i + 1).padStart(2, '0')}</b>{item}</span>)}</div>
          </div>
        </section>

        <section id="booking" className="section booking-section">
          <SectionLine index="04" title="ВЫБОР И ЗАПИСЬ" />
          <div className="booking-head reveal">
            <h2>СОБЕРИ<br /><span>СВОЙ CUT.</span></h2>
            <p>Четыре шага. Выбор сохраняется, к любому пройденному этапу можно вернуться.</p>
          </div>
          <div className="steps" aria-label="Этапы записи">
            {['УСЛУГА', 'БАРБЕР', 'ВРЕМЯ', 'ДЕТАЛИ'].map((label, i) => {
              const n = i + 1; const enabled = n === 1 || (n === 2 && !!serviceId) || (n === 3 && !!barberId) || (n === 4 && dayIndex !== null && !!selectedTime)
              return <button key={label} className={bookingStep === n ? 'active' : ''} disabled={!enabled} onClick={() => enabled && setBookingStep(n)}><span>0{n}</span>{label}{i < 3 && <ArrowRight />}</button>
            })}
          </div>
          <div className="booking-stage" key={`${bookingStep}-${booked}`}>
            {bookingStep === 1 && <div className="service-selection">
              <div className="service-category-head"><span>01 / УСЛУГИ СТРИЖКИ</span><p>Выберите основную форму или запишитесь отдельно только на дополнительную услугу.</p></div>
              <div className="service-cards compact">
                {services.map((service, i) => <button className={`service-card ${serviceId === service.id ? 'selected' : ''}`} key={service.id} onClick={() => chooseService(service.id)}>
                  <span className="card-index">0{i + 1}</span><h3>{service.title}</h3><h4>{service.subtitle}</h4><p>{service.description}</p>
                  <div className="service-duration"><Clock /> <b>{service.duration}</b><span>МИНУТ<br />НА РЕЗУЛЬТАТ</span></div>
                  <div className="cut-process"><strong>ЭТАПЫ CUT</strong><div>{service.steps.split(' → ').map((step, stepIndex) => <span key={step}><b>{String(stepIndex + 1).padStart(2, '0')}</b>{step}</span>)}</div></div>
                  <div className="price">от {rub(service.price)} <ArrowUpRight /></div>
                </button>)}
              </div>
              <div className={`extras-price ${extrasPriceOpen ? 'open' : ''}`}>
                <button className="extras-price-toggle" type="button" aria-expanded={extrasPriceOpen} aria-controls="extras-price-list" onClick={() => setExtrasPriceOpen(open => !open)}>
                  <span><small>02 / ОТДЕЛЬНАЯ ЗАПИСЬ</small>Доп. услуги</span>
                  <span>{extrasPriceOpen ? 'Скрыть' : 'Открыть прайс'} <ChevronDown /></span>
                </button>
                <div id="extras-price-list" className="extras-price-panel" aria-hidden={!extrasPriceOpen} inert={!extrasPriceOpen}>
                  <div>
                    {extras.map(([id, name, price], i) => <button type="button" key={id} onClick={() => extraToBooking(id)} aria-label={`Записаться на услугу «${name}»`}>
                      <span><small>{String(i + 1).padStart(2, '0')}</small><strong>{name}</strong></span>
                      <span><b>{rub(price)}</b><ArrowUpRight /></span>
                    </button>)}
                  </div>
                  <p>Нажмите на услугу — сразу выберите барбера, затем дату и время. Стрижка к такой записи не добавляется.</p>
                </div>
              </div>
            </div>}

            {bookingStep === 2 && selectedService && <div>
              <div className="stage-title"><div><span>Вы выбрали</span><h3>{selectedService.title}</h3></div><button onClick={() => setBookingStep(1)}><ArrowLeft /> Изменить услугу</button></div>
              <div className="barber-cards">
                {barbers.filter(b => selectedService.barbers.includes(b.id)).map(barber => <article className={`barber-card ${barberId === barber.id ? 'selected' : ''}`} key={barber.id}>
                  <div className="barber-photo"><img src={barber.image} alt={`Барбер ${barber.name}`} referrerPolicy="no-referrer" /><span><Star fill="currentColor" /> {barber.rating}</span></div>
                  <div className="barber-content"><p className="eyebrow">СТАЖ / {barber.experience}</p><h3>{barber.name}</h3><p>{barber.bio}</p><p><b>Специализация:</b> {barber.specialty}</p>
                    <div className="tools"><Scissors /> {barber.tools.join(' / ')}</div>
                    <div className="barber-bottom"><div><a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label={`Instagram ${barber.name}`}><Instagram /></a><a href="https://tiktok.com" target="_blank" rel="noreferrer" aria-label={`TikTok ${barber.name}`}><Music2 /></a></div><button onClick={() => chooseBarber(barber.id)}>Выбрать барбера <ArrowUpRight /></button></div>
                  </div>
                </article>)}
              </div>
            </div>}

            {bookingStep === 3 && selectedBarber && <div>
              <div className="stage-title"><div><span>Барбер</span><h3>{selectedBarber.name}</h3></div><button onClick={() => setBookingStep(2)}><ArrowLeft /> Изменить барбера</button></div>
              <div className="calendar-days">
                {dates.map((date, i) => <button key={date.toISOString()} onClick={() => { setDayIndex(i); setSelectedTime('') }} className={dayIndex === i ? 'active' : ''}><span>{date.toLocaleDateString('ru-RU', { weekday: 'short' })}</span><strong>{date.getDate()}</strong><small>{date.toLocaleDateString('ru-RU', { month: 'short' })}</small></button>)}
              </div>
              {dayIndex === null ? <div className="select-hint"><CalendarPlus /> Выберите день, чтобы увидеть свободные окна</div> : <div className="time-grid">
                {timeSlots.map((time, i) => { const busy = busySlots[dayIndex].includes(i); return <button key={time} disabled={busy} className={selectedTime === time ? 'active' : ''} onClick={() => setSelectedTime(time)}><strong>{time}</strong>{busy && <span>занято</span>}</button> })}
              </div>}
              <div className="stage-next"><button className="btn-primary" disabled={!selectedTime} onClick={() => setBookingStep(4)}>Продолжить <ArrowRight /></button></div>
            </div>}

            {bookingStep === 4 && selectedService && selectedBarber && dayIndex !== null && !booked && <div>
              <div className="stage-title"><div><span>Финальный шаг</span><h3>Детали записи</h3></div><button onClick={() => setBookingStep(3)}><ArrowLeft /> Изменить время</button></div>
              <form className="booking-form" onSubmit={submitBooking} noValidate>
                <div className="booking-summary">
                  <p className="eyebrow">ВАШ ВЫБОР</p>
                  <div><span>Барбер</span><strong>{selectedBarber.name}</strong></div>
                  <div><span>Дата</span><strong>{dates[dayIndex].toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', weekday: 'long' })}</strong></div>
                  <div><span>Время</span><strong>{selectedTime}</strong></div>
                  <div><span>{selectedService.id.startsWith('extra-') ? 'Доп. услуга' : 'Стрижка'}</span><strong>{selectedService.title}</strong></div>
                  <div><span>Длительность</span><strong>{selectedService.duration} минут</strong></div>
                  <div><span>Базовая стоимость</span><strong>{rub(selectedService.price)}</strong></div>
                </div>
                <div className="form-fields">
                  <label>Имя *<input value={guestName} onChange={e => setGuestName(e.target.value)} placeholder="Как к вам обращаться" autoComplete="name" maxLength={80} /></label>
                  <label>Номер телефона *<input value={guestPhone} onChange={e => setGuestPhone(maskPhone(e.target.value))} placeholder="+7 (___) ___-__-__" inputMode="tel" autoComplete="tel" /></label>
                  <label className="full">Комментарий<textarea value={guestComment} onChange={e => setGuestComment(e.target.value)} placeholder="Пожелания к форме или важная деталь" rows={3} maxLength={500} /></label>
                  <fieldset className="promo-picker full"><legend>Выбор акции</legend>
                    <label className={!selectedPromo ? 'active' : ''}><input type="radio" name="booking-promo" checked={!selectedPromo} onChange={() => choosePromo('')} /><span>Без акции</span><b>Полная стоимость</b></label>
                    {promos.map(promo => <label key={promo.id} className={selectedPromo === promo.id ? 'active' : ''}><input type="radio" name="booking-promo" checked={selectedPromo === promo.id} onChange={() => choosePromo(promo.id)} /><span>{promo.title}</span><b>{promo.discount}</b></label>)}
                  </fieldset>
                  {activePromo && <div className="promo-detail full"><strong>{activePromo.title} / {activePromo.discount}</strong><p>{activePromo.detail}</p>{selectedPromo === 'first' && <p className={`promo-eligibility ${normalizedGuestPhone.length === 11 ? firstCutEligible ? 'eligible' : 'not-eligible' : ''}`} role="status">{normalizedGuestPhone.length !== 11 ? 'Введите номер полностью — скидка применится после проверки.' : firstCutEligible ? 'Номер не найден: скидка первого визита применена.' : 'Номер уже есть в системе: выберите другую акцию.'}</p>}</div>}
                  {selectedPromo === 'father' && <div className="companion-booking full">
                    <div className="companion-head"><div><span>ВТОРАЯ ЗАПИСЬ</span><h4>СЫН / ДЕТСКИЙ CUT</h4></div>{companionService && companionBarber && companionDayIndex !== null && companionTime && !companionOpen && <button type="button" onClick={() => { setCompanionOpen(true); setCompanionStep(1) }}>Изменить</button>}</div>
                    {!companionOpen && !(companionService && companionBarber && companionDayIndex !== null && companionTime) && <button type="button" className="add-companion" onClick={() => { setCompanionOpen(true); setCompanionStep(1) }}>Добавить запись <ArrowUpRight /></button>}
                    {!companionOpen && companionService && companionBarber && companionDayIndex !== null && companionTime && <div className="companion-summary"><span>{companionService.title}</span><span>{companionBarber.name}</span><span>{dates[companionDayIndex].toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' })} / {companionTime}</span><strong>{rub(companionService.price)}</strong></div>}
                    {companionOpen && <div className="companion-flow">
                      <div className="companion-progress"><span className={companionStep === 1 ? 'active' : ''}>01 УСЛУГА</span><span className={companionStep === 2 ? 'active' : ''}>02 БАРБЕР</span><span className={companionStep === 3 ? 'active' : ''}>03 ВРЕМЯ</span></div>
                      {companionStep === 1 && <div className="companion-services">{services.map(service => <button type="button" key={service.id} className={companionServiceId === service.id ? 'active' : ''} onClick={() => { setCompanionServiceId(service.id); setCompanionBarberId(''); setCompanionDayIndex(null); setCompanionTime(''); setCompanionStep(2) }}><span>{service.title}</span><b>{service.duration} мин / {rub(service.price)}</b></button>)}</div>}
                      {companionStep === 2 && companionService && <div><button type="button" className="companion-back" onClick={() => setCompanionStep(1)}><ArrowLeft /> К услугам</button><div className="companion-barbers">{barbers.filter(barber => companionService.barbers.includes(barber.id)).map(barber => <button type="button" key={barber.id} className={companionBarberId === barber.id ? 'active' : ''} onClick={() => { setCompanionBarberId(barber.id); setCompanionStep(3) }}><img src={barber.image} alt={`Барбер для второй записи ${barber.name}`} referrerPolicy="no-referrer" /><span>{barber.name}</span><b>{barber.experience}</b></button>)}</div></div>}
                      {companionStep === 3 && companionBarber && <div><button type="button" className="companion-back" onClick={() => setCompanionStep(2)}><ArrowLeft /> К барберам</button><div className="companion-dates">{dates.map((date, i) => <button type="button" key={date.toISOString()} className={companionDayIndex === i ? 'active' : ''} onClick={() => { setCompanionDayIndex(i); setCompanionTime('') }}><span>{date.toLocaleDateString('ru-RU', { weekday: 'short' })}</span><b>{date.getDate()}</b></button>)}</div>{companionDayIndex !== null && <div className="companion-times">{timeSlots.map((time, i) => { const busy = busySlots[(companionDayIndex + 2) % busySlots.length].includes(i); const parentTime = companionDayIndex === dayIndex && time === selectedTime; const unavailable = busy || parentTime; return <button type="button" key={time} disabled={unavailable} className={companionTime === time ? 'active' : ''} onClick={() => setCompanionTime(time)}><span>{time}</span>{parentTime ? <small>время папы</small> : busy && <small>занято</small>}</button> })}</div>}<button type="button" className="btn-primary companion-done" disabled={companionDayIndex === null || !companionTime} onClick={() => setCompanionOpen(false)}>Добавить к записи <Check /></button></div>}
                    </div>}
                  </div>}
                  <fieldset className="extras full"><legend>Добавить к записи</legend>{extras.filter(([id]) => selectedService.id !== `extra-${id}`).map(([id, name, price]) => <label key={id} className={selectedExtras.includes(id) ? 'checked' : ''}><input type="checkbox" checked={selectedExtras.includes(id)} onChange={() => setSelectedExtras(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])} /><span><Check /></span><b>{name}</b><em>+ {rub(price)}</em></label>)}</fieldset>
                  <div className="form-total full"><div><span>Услуги</span><b>{rub(baseTotal)}</b></div>{extrasTotal > 0 && <div><span>Дополнительно</span><b>+ {rub(extrasTotal)}</b></div>}{promoSaving > 0 && <div className="discount-line"><span>Скидка / {activePromo?.title}</span><b>− {rub(promoSaving)}</b></div>}<div className="grand-total"><span>Итого</span><strong>{rub(total)}</strong></div></div>
                  <label className="consent full"><input type="checkbox" checked={privacy} onChange={e => setPrivacy(e.target.checked)} /><span><Check /></span><small>Согласен с политикой конфиденциальности и обработкой персональных данных.</small></label>
                  {bookingError && <p className="form-error full" role="alert">{bookingError}</p>}
                  <button className="btn-primary full" type="submit">Подтвердить запись <ArrowUpRight /></button>
                </div>
              </form>
            </div>}

            {bookingStep === 4 && booked && selectedBarber && dayIndex !== null && <div className="booking-success">
              <span className="success-icon"><Check /></span><p>ЗАПИСЬ ПОДТВЕРЖДЕНА</p><h3>ТВОЙ CUT<br /><em>ЗАБРОНИРОВАН</em></h3>
              <div><span>{selectedBarber.name}</span><span>{dates[dayIndex].toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' })}</span><span>{selectedTime}</span></div>
              <button className="btn-primary" onClick={() => setCalendarMenuOpen(open => !open)}><CalendarPlus /> Добавить в календарь <ChevronDown /></button>
              {calendarMenuOpen && calendarEvent && <div className="calendar-options"><span>Выберите календарь</span><a href={calendarEvent.google} target="_blank" rel="noreferrer">Google Calendar <ArrowUpRight /></a><a href={calendarEvent.outlook} target="_blank" rel="noreferrer">Outlook <ArrowUpRight /></a><a className="device-calendar" href={calendarEvent.ics} download="cut-appointment.ics"><span><Smartphone />Календарь телефона<small>Apple / Samsung / Xiaomi / POCO / HONOR</small></span><ArrowUpRight /></a></div>}
              <button className="text-button" onClick={() => { setCalendarMenuOpen(false); setBooked(false); setBookingStep(1) }}>Записаться ещё раз</button>
            </div>}
          </div>
        </section>

        <section id="reviews" className="section reviews-section">
          <SectionLine index="05" title="ОТЗЫВЫ И СОЦСЕТИ" />
          <div className="reviews-head reveal"><h2>ГОВОРЯТ<br /><span>ПОСЛЕ CUT.</span></h2><div><button onClick={() => setReviewIndex((reviewIndex - 1 + reviews.length) % reviews.length)} aria-label="Предыдущий отзыв"><ArrowLeft /></button><button onClick={() => setReviewIndex((reviewIndex + 1) % reviews.length)} aria-label="Следующий отзыв"><ArrowRight /></button></div></div>
          <div className="review-track" onTouchStart={e => { touchStart.current = e.touches[0].clientX }} onTouchEnd={e => { const dx = e.changedTouches[0].clientX - touchStart.current; if (Math.abs(dx) > 45) setReviewIndex((reviewIndex + (dx < 0 ? 1 : -1) + reviews.length) % reviews.length) }}>
            {[0, 1, 2].map(offset => { const item = reviews[(reviewIndex + offset) % reviews.length]; return <article className="review-card" key={`${item.name}-${reviewIndex}-${offset}`}>
              <div className="review-top"><span>{String((reviewIndex + offset) % reviews.length + 1).padStart(2, '0')}</span><div>{Array.from({ length: item.rating }, (_, i) => <Star key={i} fill="currentColor" />)}</div></div>
              <blockquote>«{item.text}»</blockquote><div className="review-meta"><strong>{item.name}</strong><span>{item.service}</span><span>{item.date}</span></div>
            </article> })}
          </div>
        </section>

        <section id="faq" className="section faq-section">
          <SectionLine index="06" title="FAQ" />
          <div className="faq-layout">
            <div className="reveal"><h2>КОРОТКО<br /><span>О ВАЖНОМ.</span></h2><p>Если вашего вопроса нет в списке, позвоните — ответим без скрипта.</p></div>
            <div className="faq-list">{faqs.map(([question, answer], i) => { const open = openFaqs.includes(i); return <article className={open ? 'open' : ''} key={question}><button onClick={() => setOpenFaqs(prev => prev.includes(i) ? prev.filter(x => x !== i) : [...prev, i])} aria-expanded={open}><span>{String(i + 1).padStart(2, '0')}</span><strong>{question}</strong><ChevronDown /></button><div className="faq-answer"><p>{answer}</p></div></article> })}</div>
          </div>
        </section>

        <section id="socials" className="social-section">
          <div className="social-copy reveal"><p>07 — СОЦИАЛЬНЫЕ СЕТИ</p><h2>CUT В<br /><span>ДВИЖЕНИИ</span></h2><div><a href="https://instagram.com" target="_blank" rel="noreferrer"><Instagram /> Instagram <ArrowUpRight /></a><a href="https://tiktok.com" target="_blank" rel="noreferrer"><Music2 /> TikTok <ArrowUpRight /></a></div></div>
          <div className="social-grid reveal">
            {[
              'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=900&q=85',
              'https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=900&q=85',
              '/cut-hero.png',
              'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&w=900&q=85'
            ].map((src, i) => <a href={i % 2 ? 'https://tiktok.com' : 'https://instagram.com'} target="_blank" rel="noreferrer" key={src} aria-label="Открыть публикацию CUT"><img src={src} alt={`Рабочий момент в CUT, кадр ${i + 1}`} referrerPolicy="no-referrer" /><span>{i % 2 ? <Music2 /> : <Instagram />}</span></a>)}
          </div>
        </section>

        <section id="certificates" className="section certificates-section">
          <SectionLine index="08" title="ПОДАРОЧНЫЕ СЕРТИФИКАТЫ" />
          <div className="intro-grid reveal"><h2>ПОДАРИ<br /><span>ХОРОШИЙ CUT.</span></h2><p>Электронный сертификат для тех, кому лучше дарить не вещь, а точное ощущение себя.</p></div>
          <div className="certificate-grid">{certificates.map((item, i) => <button className="certificate-card reveal" key={item.id} onClick={() => openCertificate(item)}>
            <span className="cert-index">CUT / 0{i + 1}</span><Crown /><div><p>ПОДАРОЧНЫЙ СЕРТИФИКАТ</p><h3>{item.name}</h3><strong>{rub(item.price)}</strong><p>{item.description}</p></div><span className="cert-action">Выбрать <ArrowUpRight /></span>
          </button>)}</div>
        </section>

        <section id="contacts" className="section contacts-section">
          <SectionLine index="09" title="КОНТАКТЫ" />
          <div className="contacts-title reveal"><h2>ТВОЙ CUT<br /><span>В ЦЕНТРЕ МОСКВЫ.</span></h2></div>
          <div className="contacts-grid">
            <div className="contact-details reveal">
              <div><span>Адрес</span><strong>Москва, улица Покровка, 19</strong></div><div><span>Метро</span><strong>Чистые пруды</strong></div><div><span>Телефон</span><a href="tel:+74951202818">+7 (495) 120-28-18</a></div><div><span>Время работы</span><strong>Ежедневно / 10:00–22:00</strong></div><div><span>Поддержка</span><a href="mailto:support@cut-barber.ru">support@cut-barber.ru</a></div>
              <a className="btn-primary" href="https://yandex.ru/maps/?text=Москва%2C%20улица%20Покровка%2C%2019" target="_blank" rel="noreferrer"><MapPin /> Открыть в картах <ArrowUpRight /></a>
            </div>
            <div className="map-card reveal"><iframe title="Карта проезда к CUT на Покровке" src="https://www.openstreetmap.org/export/embed.html?bbox=37.6364%2C55.7531%2C37.6564%2C55.7651&layer=mapnik&marker=55.7591%2C37.6464" loading="lazy" referrerPolicy="no-referrer" sandbox="allow-scripts allow-same-origin allow-popups" allowFullScreen /></div>
          </div>
          <div className="facade-gallery reveal">
            <figure><img src="https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=1500&q=85" alt="Демонстрационный вечерний фасад барбершопа CUT" referrerPolicy="no-referrer" /><figcaption>ВЕЧЕР / ФАСАД 01</figcaption></figure>
            <figure><img src="/cut-hero.png" alt="Демонстрационный интерьер барбершопа CUT за стеклом" /><figcaption>ИНТЕРЬЕР / СВЕТ 02</figcaption></figure>
          </div>
          <p className="demo-note">Адрес, телефон, почта и фотографии демонстрационные и должны быть заменены перед публикацией реального сайта.</p>
        </section>
      </main>

      <footer>
        <div className="footer-top"><div><a href="#top" className="footer-logo">CUT<span>®</span></a><p>СТРИЖЁМ ТОЧНО.</p></div><nav>{navItems.map(([label, href]) => <a href={href} key={label}>{label}</a>)}</nav><div className="footer-contacts"><a href="tel:+74951202818">+7 (495) 120-28-18</a><a href="mailto:support@cut-barber.ru">support@cut-barber.ru</a><a className="footer-social-link" href="https://instagram.com" target="_blank" rel="noreferrer">Instagram <ArrowUpRight aria-hidden="true" /></a><a className="footer-social-link" href="https://tiktok.com" target="_blank" rel="noreferrer">TikTok <ArrowUpRight aria-hidden="true" /></a></div></div>
        <div className="footer-bottom"><span>© 2026 CUT BARBERSHOP</span><a href="#">Политика конфиденциальности</a><a href="#">Согласие на обработку данных</a><a href="#top" aria-label="Вернуться наверх">Наверх <ArrowUp /></a></div>
      </footer>

      {certificate && <div className="modal-backdrop" onMouseDown={e => { if (e.target === e.currentTarget) setCertificate(null) }}>
        <div className="modal" role="dialog" aria-modal="true" aria-labelledby="cert-title">
          <button className="modal-close" onClick={() => setCertificate(null)} aria-label="Закрыть окно"><X /></button>
          {!certDone ? <>
            <div className="modal-head"><span>07 / СЕРТИФИКАТ</span><h2 id="cert-title">{certificate.name}</h2><p>{certificate.description}</p><strong>{rub(certificate.price)}</strong></div>
            <form onSubmit={submitCertificate} noValidate>
              <div className="secure-payment-note full" role="note"><ShieldCheck /><div><strong>Платёжные данные здесь не вводятся</strong><p>Это демонстрационный интерфейс. В реальном проекте оплата должна открываться на защищённой странице сертифицированного платёжного провайдера.</p></div></div>
              <label className="full">Телефон покупателя<input autoFocus value={buyerPhone} onChange={e => setBuyerPhone(maskPhone(e.target.value))} inputMode="tel" autoComplete="tel" placeholder="+7 (___) ___-__-__" /></label>
              <fieldset className="delivery full"><legend>Доставка сертификата</legend><label className={delivery === 'sms' ? 'active' : ''}><input type="radio" name="delivery" checked={delivery === 'sms'} onChange={() => setDelivery('sms')} />SMS</label><label className={delivery === 'email' ? 'active' : ''}><input type="radio" name="delivery" checked={delivery === 'email'} onChange={() => setDelivery('email')} />Электронная почта</label></fieldset>
              <div className={`email-field full ${delivery === 'email' ? 'show' : ''}`}>{delivery === 'email' && <label>Email<input value={email} onChange={e => setEmail(e.target.value)} type="email" autoComplete="email" placeholder="name@example.ru" maxLength={254} /></label>}</div>
              <label className="consent full"><input type="checkbox" checked={certConsent} onChange={e => setCertConsent(e.target.checked)} /><span><Check /></span><small>Согласен с условиями демонстрационного оформления.</small></label>
              {certError && <p className="form-error full" role="alert">{certError}</p>}
              <div className="modal-total full"><span>Итого</span><strong>{rub(certificate.price)}</strong></div><button className="btn-primary full" type="submit">Оформить демо-сертификат <ArrowUpRight /></button>
              <p className="payment-note full">Реального платежа, списания и передачи данных не происходит.</p>
            </form>
          </> : <div className="cert-success"><span><Check /></span><p>ГОТОВО</p><h2>Сертификат<br />оформлен</h2><p>{certificate.name} будет отправлен выбранным способом. Реального списания не производилось.</p><button className="btn-primary" onClick={() => setCertificate(null)}>Закрыть</button></div>}
        </div>
      </div>}
    </div>
  )
}
