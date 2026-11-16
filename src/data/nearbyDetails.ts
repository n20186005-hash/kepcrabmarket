import type { NearbyLang, NearbySlug } from './nearbyGuides';

type Local = Record<NearbyLang, string>;
type Detail = { management: Local; architecture: Local; route: Record<NearbyLang, string[]>; photo: Local; faq: Record<NearbyLang, {q:string;a:string}[]>; mapQuery: string; imageSource: string; imageAlt: Local; managementSource: string };
export const nearbyDetails: Record<NearbySlug, Detail> = {
  'kep-national-park': {
    management: {
      en: 'Kep National Park is part of Cambodia’s national protected-area system. The Kep Provincial Department of Environment is identified as its management authority under the Ministry of Environment. The protected hillside is important for conserving forest habitat while providing a place for recreation above the coast.',
      zh: '凯普国家公园属于柬埔寨国家自然保护地体系，由环境部体系下的凯普省环境部门负责管理。公园保护海岸后方的山地森林，同时提供自然游览空间。它不是由螃蟹市场摊贩或附近度假酒店经营的景点。',
      km: 'ឧទ្យានជាតិកែបជាផ្នែកមួយនៃប្រព័ន្ធតំបន់ការពារធម្មជាតិកម្ពុជា។ មន្ទីរបរិស្ថានខេត្តកែបនៅក្រោមក្រសួងបរិស្ថានជាអង្គភាពគ្រប់គ្រង។ តំបន់នេះជួយការពារព្រៃលើភ្នំ និងផ្ដល់កន្លែងលំហែកាយលើឆ្នេរ។',
    },
    architecture: {
      en: 'The defining built elements are the hillside access road, trail junctions and viewpoints rather than monumental buildings. Watch how the winding route follows the slope and opens occasional views over Kep town and the Gulf of Thailand. Do not confuse the park with Kep’s separate historic seaside villas.',
      zh: '这里的人工景观重点并非宏伟建筑，而是依山修建的道路、步道岔口与观景空间。沿着弯曲山路观察地形变化及凯普海岸的视野。凯普市区的历史别墅是另一类独立文化景观，不应误认为公园建筑。',
      km: 'សំណង់សំខាន់ៗនៅទីនេះគឺផ្លូវឡើងភ្នំ ផ្លូវបំបែក និងកន្លែងមើលទេសភាព មិនមែនអគារធំៗទេ។ សង្កេតរបៀបផ្លូវកោងតាមជម្រាលភ្នំ និងទិដ្ឋភាពឆ្នេរកែប។ វីឡាបុរាណក្នុងក្រុងជាទីតាំងផ្សេង។',
    },
    route: {
      en: ['Start early at the signed park access point and confirm your intended loop.', 'Follow the established hillside road through forest; stop at safe viewpoints for coastal photographs.', 'Return by the agreed route before dark and continue to Crab Market for a separate seafood stop.'],
      zh: ['清晨从有标识的公园入口出发，先确认当天计划走的环线。', '沿山坡现有道路进入林间，在安全的观景处拍摄海岸与山林。', '天黑前沿计划路线返回，再前往螃蟹市场用餐。'],
      km: ['ចេញដំណើរពេលព្រឹកពីច្រកចូលមានសញ្ញា និងពិនិត្យផ្លូវដែលនឹងដើរ។', 'ដើរតាមផ្លូវភ្នំក្នុងព្រៃ ហើយថតរូបនៅកន្លែងមើលទេសភាពដែលមានសុវត្ថិភាព។', 'ត្រឡប់មុនយប់ រួចអាចទៅញ៉ាំអាហារនៅផ្សារក្តាម។'],
    },
    photo: { en: 'Photograph the curve of the forest road and the contrast between green slopes and the bay; avoid standing on blind bends.', zh: '适合拍摄林间道路的弧线、山坡绿色层次与海湾远景；不要站在视线盲区的弯道中央。', km: 'ថតផ្លូវកោងក្នុងព្រៃ និងទេសភាពភ្នំបៃតងជាមួយសមុទ្រ។ កុំឈរថតនៅកន្លែងផ្លូវកោងដែលមើលមិនឃើញ។' },
    faq: {
      en: [{q:'Is the loop an easy flat walk?',a:'No. Even when using the main road, it is a hilly outing. Choose a shorter out-and-back if heat or time is a concern.'},{q:'Can I visit after heavy rain?',a:'Check trail and road conditions locally. Wet slopes and exposed corners can be slippery.'}],
      zh: [{q:'公园环线是平坦步道吗？',a:'不是。主路也有坡度，体力或时间有限可以选择较短的原路往返。'},{q:'大雨后还能参观吗？',a:'请现场核实道路与步道状况，潮湿坡面和转弯处可能湿滑。'}],
      km: [{q:'តើផ្លូវដើររាបស្មើឬទេ?',a:'មិនមែនទេ។ ផ្លូវមានជម្រាល។ ប្រសិនបើពេលតិច អាចជ្រើសផ្លូវខ្លីហើយត្រឡប់វិញ។'},{q:'អាចទៅក្រោយភ្លៀងខ្លាំងទេ?',a:'សូមពិនិត្យស្ថានភាពផ្លូវនៅទីតាំង ព្រោះជម្រាលអាចរអិល។'}],
    },
    mapQuery: 'Kep National Park, Kep Province, Cambodia', imageSource: 'https://commons.wikimedia.org/wiki/File:Kep_National_Park_6.jpg', imageAlt: {en:'Forested landscape in Kep National Park',zh:'凯普国家公园林地实景',km:'ទេសភាពព្រៃក្នុងឧទ្យានជាតិកែប'}, managementSource: 'https://ncsd.moe.gov.kh/sites/default/files/2022-07/Final_Repport_Biodiversity_Vulnerability_Adaptation.pdf',
  },
  'kep-beach': {
    management: {
      en: 'Kep Beach is a public coastal destination within Kep City. The provincial and city administrations oversee public-space and tourism-order matters, in cooperation with the provincial tourism department. Individual stalls and beach services are separate commercial operators; there is no single private operator of the whole public beach.',
      zh: '凯普海滩属于凯普市的公共海滨空间。省、市行政部门会与省旅游部门共同处理公共空间秩序及旅游服务相关事务；沿岸摊位与租赁服务由不同经营者提供，不能将整片公共海滩描述为某一家商户管理。',
      km: 'ឆ្នេរកែបជាតំបន់មាត់សមុទ្រសាធារណៈក្នុងក្រុងកែប។ រដ្ឋបាលខេត្ត និងក្រុង សហការជាមួយមន្ទីរទេសចរណ៍ខេត្ត លើសណ្ដាប់ធ្នាប់សាធារណៈ និងសេវាទេសចរណ៍។ តូបលក់ដូរនីមួយៗជាអាជីវកម្មផ្សេងៗ មិនមែនជាអ្នកគ្រប់គ្រងឆ្នេរទាំងមូលទេ។',
    },
    architecture: {
      en: 'The sea-facing promenade, beachfront landscaping and the recognisable crab sculpture shape the visitor experience. The nearby hills reflect Kep’s history as a seaside resort, but the waterfront itself is best read as a public coastal space rather than a preserved historic palace or building.',
      zh: '沿海步道、海滨公共空间与标志性的螃蟹雕像构成游客最容易辨认的景观。后方山坡与凯普度假城镇历史相联系，但海滩本身不是某座保存完好的历史宫殿或单体建筑。',
      km: 'ផ្លូវដើរមាត់សមុទ្រ តំបន់សាធារណៈ និងរូបសំណាកក្តាមជាចំណុចសម្គាល់សំខាន់។ ភ្នំខាងក្រោយពាក់ព័ន្ធនឹងប្រវត្តិក្រុងលំហែកាយកែប ប៉ុន្តែឆ្នេរជាកន្លែងសាធារណៈ មិនមែនជាអគារបុរាណតែមួយទេ។',
    },
    route: {
      en: ['Arrive at the beach’s own map location rather than the Crab Market.', 'Walk the accessible waterfront, find a clear view of the crab sculpture and pause for photographs.', 'Continue along the public seafront, then travel separately to the Crab Market if desired.'],
      zh: ['先导航至凯普海滩自己的地图定位，而非螃蟹市场。', '沿可通行的海滨空间步行，寻找螃蟹雕像与海湾构图。', '沿公共海岸继续散步，随后再单独前往螃蟹市场。'],
      km: ['ទៅតាមផែនទីឆ្នេរកែបផ្ទាល់ មិនមែនទីតាំងផ្សារក្តាម។', 'ដើរតាមមាត់ឆ្នេរ រកទិដ្ឋភាពរូបសំណាកក្តាម និងថតរូប។', 'បន្តដើរតាមឆ្នេរសាធារណៈ រួចទៅផ្សារក្តាមបើចង់។'],
    },
    photo: {en:'Use the crab sculpture and curving shoreline as landmarks, especially when the afternoon light falls across the water.',zh:'可利用螃蟹雕像、海岸弧线与远处山坡构图，下午斜射的光线适合拍摄海滨层次。',km:'យករូបសំណាកក្តាម និងខ្សែឆ្នេរកោងជាចំណុចថតរូប ជាពិសេសពេលរសៀល។'},
    faq: {
      en: [{q:'Is this the same location as the Crab Market?',a:'No. They are separate waterfront stops. Use the Kep Beach pin for this visit.'},{q:'Can I swim here?',a:'Observe the conditions and local safety notices on the day; do not assume lifeguards or calm water.'}],
      zh: [{q:'这里就是螃蟹市场吗？',a:'不是。两个地点都位于凯普海岸，但应分别使用自己的地图定位。'},{q:'能在这里游泳吗？',a:'请查看当天海况和现场安全告示，不要预设一定有救生员或平静海况。'}],
      km: [{q:'តើនេះជាទីតាំងផ្សារក្តាមដែរឬទេ?',a:'ទេ។ ឆ្នេរ និងផ្សារក្តាមជាទីតាំងផ្សេងគ្នា។'},{q:'អាចហែលទឹកបានទេ?',a:'ពិនិត្យស្ថានភាពសមុទ្រ និងសេចក្ដីជូនដំណឹងសុវត្ថិភាពក្នុងថ្ងៃនោះ។'}],
    },
    mapQuery: 'Kep Beach, Kep City, Cambodia', imageSource: 'https://commons.wikimedia.org/wiki/File:Kep_Beach.jpg', imageAlt: {en:'Kep Beach with sand, swimmers and hills',zh:'凯普海滩沙滩、游客与山坡实景',km:'ឆ្នេរកែប មានខ្សាច់ អ្នកទេសចរ និងភ្នំ'}, managementSource: 'https://phnompenhpost.com/national/kep-beach-vendor-admonished-by-authorities-over-water-festival-price-gouging/',
  },
  'koh-tonsay': {
    management: {
      en: 'Koh Tonsay, or Rabbit Island, is administered by Kep Province, according to an Asian Development Bank environmental report. Public infrastructure and coastal management involve relevant Cambodian authorities, while boat operators and island businesses provide their own services. The island should not be described as managed by Kep Crab Market.',
      zh: '根据亚洲开发银行的环境资料，兔子岛由凯普省行政管辖。岛上公共基础设施与海岸管理涉及相关政府部门，渡船和岛上商户则分别经营自身服务。因此，兔子岛并不由螃蟹市场管理。',
      km: 'តាមរបាយការណ៍បរិស្ថានរបស់ធនាគារអភិវឌ្ឍន៍អាស៊ី កោះទន្សាយស្ថិតក្រោមការគ្រប់គ្រងរដ្ឋបាលខេត្តកែប។ សេវាទូក និងអាជីវកម្មលើកោះមានអ្នកផ្ដល់សេវាផ្សេងៗ។ កោះនេះមិនគ្រប់គ្រងដោយផ្សារក្តាមទេ។',
    },
    architecture: {
      en: 'The island experience is shaped by its boat landing, modest beachfront structures and fishing-oriented shore rather than major monuments. Observe the transition from the Kep mainland pier to a smaller island arrival point; facilities and access may change with improvement works.',
      zh: '兔子岛的空间特色来自船只登陆处、简朴的海滨建筑与渔业生活岸线，而非大型纪念建筑。可观察从凯普本岛码头到离岛上岸点的环境变化，基础设施可能随工程更新。',
      km: 'ទេសភាពកោះមានកន្លែងទូកចូលចត សំណង់សាមញ្ញតាមឆ្នេរ និងជីវភាពនេសាទ មិនមែនសំណង់ធំៗទេ។ សង្កេតភាពខុសគ្នារវាងកំពង់ផែកែប និងកន្លែងចូលចតលើកោះ។',
    },
    route: {
      en: ['Go to the Kep passenger pier and agree the return boat plan before departure.', 'On arrival, orient yourself at the landing and follow established shore paths to a suitable beach.', 'Return to the pier with a buffer for weather and daylight; do not rely on an unverified last boat.'],
      zh: ['先到凯普客运码头，出发前约定返程船安排。', '上岛后以登陆处为起点，沿既有海滨小径前往适合停留的沙滩。', '预留天气与日照缓冲时间返回码头，不依赖未经核实的末班船信息。'],
      km: ['ទៅកំពង់ផែអ្នកដំណើរកែប និងព្រមព្រៀងអំពីទូកត្រឡប់មុនចេញដំណើរ។', 'ក្រោយចូលកោះ តម្រង់ទិសពីកន្លែងចត ហើយដើរតាមផ្លូវឆ្នេរដែលមានស្រាប់។', 'ត្រឡប់ដោយទុកពេលសម្រាប់អាកាសធាតុ និងពន្លឺថ្ងៃ។'],
    },
    photo: {en:'Photograph the landing boats, palm-fringed beach and view back towards the mainland. Keep clear of working boat operations.',zh:'可拍摄登陆船只、椰林海岸与回望本岛的视角；不要妨碍码头正常作业。',km:'ថតទូកចូលចត ឆ្នេរមានដូង និងទិដ្ឋភាពត្រឡប់ទៅដីគោក។ កុំរារាំងការងារទូក។'},
    faq: {
      en: [{q:'Can I walk to Rabbit Island from the Crab Market?',a:'No. First reach Kep’s passenger pier, then take a boat.'},{q:'Are boat timetables fixed?',a:'Do not rely on a published fixed schedule. Confirm the operator, weather and return plan on the day.'}],
      zh: [{q:'能从螃蟹市场步行到兔子岛吗？',a:'不能。必须先前往凯普客运码头，再搭船上岛。'},{q:'船班时刻固定吗？',a:'不要依赖未经核实的固定时刻表，当天确认营运者、天气与返程安排。'}],
      km: [{q:'អាចដើរពីផ្សារក្តាមទៅកោះទន្សាយទេ?',a:'មិនអាចទេ។ ត្រូវទៅកំពង់ផែកែប រួចជិះទូក។'},{q:'ម៉ោងទូកថេរឬទេ?',a:'សូមសួរអ្នកបើកទូកអំពីម៉ោងត្រឡប់ និងអាកាសធាតុក្នុងថ្ងៃនោះ។'}],
    },
    mapQuery: 'Koh Tonsay Rabbit Island Kep Cambodia', imageSource: 'https://commons.wikimedia.org/wiki/File:Koh_thonsay_beach.jpg', imageAlt: {en:'Real beach and shore on Koh Tonsay Rabbit Island',zh:'兔子岛海滩与海岸实景',km:'ទេសភាពឆ្នេរកោះទន្សាយ'}, managementSource: 'https://www.adb.org/sites/default/files/project-documents/58419/58419-002-sddr-en_2.pdf',
  },
};
