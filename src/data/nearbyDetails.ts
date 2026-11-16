import type { NearbyLang, NearbySlug } from './nearbyGuides';

type Local = Record<NearbyLang, string>;
type Detail = { management: Local; architecture: Local; route: Record<NearbyLang, string[]>; photo: Local; faq: Record<NearbyLang, {q:string;a:string}[]>; mapQuery: string; imageSource: string; imageAlt: Local; managementSource: string };
export const nearbyDetails: Record<NearbySlug, Detail> = {
  'sunset-rock': {
    management:{en:'Sunset Rock lies within Kep National Park, managed through the Kep Provincial Department of Environment under Cambodia’s Ministry of Environment. It is a viewpoint, not a separate privately managed park.',zh:'日落岩位于凯普国家公园范围内，该保护地由柬埔寨环境部体系下的凯普省环境部门管理；观景点不是另一个独立私人公园。',km:'ថ្មថ្ងៃលិចស្ថិតក្នុងឧទ្យានជាតិកែប ដែលគ្រប់គ្រងដោយមន្ទីរបរិស្ថានខេត្តកែបក្រោមក្រសួងបរិស្ថាន។'},
    architecture:{en:'The rocky natural lookout and forest footpath are the central features; any stairs or markers should be treated as trail infrastructure, not ancient monuments.',zh:'天然岩石观景平台与林间小径是核心景观；沿途阶梯或标识属于游览设施，不应误称古迹。',km:'ថ្មធម្មជាតិ និងផ្លូវព្រៃជាចំណុចសំខាន់។ ជណ្ដើរនិងសញ្ញាគឺបរិក្ខារផ្លូវ មិនមែនប្រាសាទបុរាណ។'},
    route:{en:['Confirm the side-trail entrance with local park guidance.','Ascend carefully to the stable viewpoint and observe the coast.','Turn back early enough to finish before dark.'],zh:['向当地确认支线入口。','沿步道谨慎上行，在稳固岩面观景。','提早原路返回，确保天黑前下山。'],km:['ពិនិត្យច្រកផ្លូវបំបែកជាមួយអ្នកក្នុងតំបន់។','ឡើងដោយប្រុងប្រយ័ត្ន និងមើលទេសភាព។','ត្រឡប់មុនងងឹត។']},
    photo:{en:'A wide lens can frame forest, rocky foreground and offshore islands. Keep clear of exposed edges.',zh:'可用广角同时纳入岩面前景、林木与离岸岛屿，远离裸露崖边。',km:'ថតរូបទូលាយរួមមានថ្ម ព្រៃ និងកោះឆ្ងាយ កុំទៅជិតគែមចោត។'},
    faq:{en:[{q:'Is this the main national park loop?',a:'No, it is a viewpoint reached on a side trail.'},{q:'Should I wait until dark?',a:'For unfamiliar hikers, a daylight descent is safer.'}],zh:[{q:'这里就是国家公园环线吗？',a:'不是，这是一条支线可达的具体观景点。'},{q:'要等到完全天黑吗？',a:'不熟悉路线的游客应在天黑前完成下山。'}],km:[{q:'តើនេះជាផ្លូវជុំឧទ្យានទេ?',a:'ទេ វាជាចំណុចមើលទេសភាពតាមផ្លូវបំបែក។'},{q:'គួររង់ចាំដល់ងងឹតទេ?',a:'សម្រាប់អ្នកមិនស្គាល់ផ្លូវ គួរចុះមុនងងឹត។'}]},
    mapQuery:'Sunset Rock Kep National Park Cambodia',imageSource:'https://www.airial.travel/attractions/cambodia/krong-kaeb/sunset-rock-kep-national-park-fuBFU3Za',imageAlt:{en:'Sunset Rock viewpoint in Kep forest',zh:'凯普日落岩林间观景点实景',km:'ទេសភាពថ្មថ្ងៃលិចក្នុងព្រៃកែប'},managementSource:'https://ncsd.moe.gov.kh/sites/default/files/2022-07/Final_Repport_Biodiversity_Vulnerability_Adaptation.pdf',
  },
  'kep-jungle-trail': {
    management:{en:'The trail lies within the wider Kep National Park protected landscape, overseen by the Kep Provincial Department of Environment. Religious sites along the way also warrant respect for local custodians.',zh:'该步道处于凯普国家公园保护地范围，整体由凯普省环境部门管理；沿途宗教地点也应尊重当地看护者与礼拜习惯。',km:'ផ្លូវនេះស្ថិតក្នុងតំបន់ឧទ្យានជាតិកែប ក្រោមការគ្រប់គ្រងមន្ទីរបរិស្ថានខេត្ត។ គោរពអ្នកថែរក្សាទីសក្ការៈផងដែរ។'},
    architecture:{en:'Steps, hillside paths and small religious structures make this trail a blend of practical access and local devotional landscape, distinct from the main forest road.',zh:'阶梯、山坡小径与宗教小建筑交织，形成兼有登山通行和地方信仰空间的路线，与公园主车行道不同。',km:'ជណ្ដើរ ផ្លូវចោត និងសំណង់សាសនាតូចៗបង្កើតទេសភាពដើរភ្នំ និងជំនឿ ខុសពីផ្លូវរថយន្តធំ។'},
    route:{en:['Identify the named trailhead before climbing.','Ascend the steps steadily and pause at appropriate safe points.','Respect any shrine area, then return by the established route.'],zh:['确认具名步道入口。','沿阶梯稳定上行，在安全位置休息。','经过宗教空间时保持礼貌，再沿既有道路返回。'],km:['រកច្រកផ្លូវជណ្ដើរផ្ទាល់។','ឡើងជណ្ដើរយឺតៗ និងសម្រាកនៅកន្លែងសុវត្ថិភាព។','គោរពទីសក្ការៈ និងត្រឡប់តាមផ្លូវដើម។']},
    photo:{en:'Use the steps as leading lines beneath the forest canopy; photograph religious areas respectfully and without interrupting worship.',zh:'利用阶梯作为引导线拍摄林冠层次；宗教区域拍照应尊重礼拜活动。',km:'ប្រើជណ្ដើរជាបន្ទាត់នាំភ្នែកក្នុងព្រៃ និងគោរពពេលថតទីសក្ការៈ។'},
    faq:{en:[{q:'Is this suitable after heavy rain?',a:'Steep steps can be slippery; check locally and postpone in unsafe conditions.'},{q:'Is it the same as Sunset Rock?',a:'They are related park routes, but not identical destinations.'}],zh:[{q:'大雨后适合走吗？',a:'陡阶可能湿滑，需现场核实，不安全时推迟。'},{q:'和日落岩是同一个地点吗？',a:'两者属于相关的公园步道区域，但不是同一目的地。'}],km:[{q:'អាចដើរក្រោយភ្លៀងទេ?',a:'ជណ្ដើរអាចរអិល សូមពិនិត្យស្ថានភាព។'},{q:'ដូចថ្មថ្ងៃលិចទេ?',a:'ជាផ្លូវពាក់ព័ន្ធគ្នា ប៉ុន្តែមិនមែនទីតាំងដូចគ្នាទេ។'}]},
    mapQuery:'Stairway to Heaven Kep Jungle Trail Cambodia',imageSource:'https://www.airial.travel/attractions/cambodia/krong-kaeb/sunset-rock-kep-national-park-fuBFU3Za',imageAlt:{en:'Stairway trail through Kep forest',zh:'凯普林间阶梯步道实景',km:'ផ្លូវជណ្ដើរក្នុងព្រៃកែប'},managementSource:'https://ncsd.moe.gov.kh/sites/default/files/2022-07/Final_Repport_Biodiversity_Vulnerability_Adaptation.pdf',
  },
  'kep-crab-statue': {
    management:{en:'The statue is a public coastal landmark within Kep City. Public waterfront upkeep and access involve local public authorities; it is not managed by Crab Market vendors.',zh:'螃蟹雕像是凯普市公共海滨地标，周边公共空间的维护与秩序涉及当地行政部门，并非由螃蟹市场商户管理。',km:'រូបសំណាកជាសញ្ញាសម្គាល់សាធារណៈក្នុងក្រុងកែប។ ការថែទាំ និងសណ្ដាប់ធ្នាប់ពាក់ព័ន្ធនឹងអាជ្ញាធរមូលដ្ឋាន មិនមែនអ្នកលក់នៅផ្សារក្តាមទេ។'},
    architecture:{en:'The oversized crab form sits above the water, turning the species associated with Kep’s seafood trade into a striking sculptural silhouette.',zh:'大型螃蟹造型立于水面，将凯普闻名的海鲜物种转化成醒目的海岸剪影。',km:'រូបក្តាមធំនៅលើទឹកបង្ហាញអត្តសញ្ញាណអាហារសមុទ្រកែបជាសំណង់សិល្បៈ។'},
    route:{en:['Start from the safe public seafront near Kep Beach.','View the statue from shore and take photographs with the coastline behind it.','Continue along the promenade; visit the Crab Market as a separate stop.'],zh:['从凯普海滩附近安全的公共岸线出发。','从岸边欣赏雕像，以海岸为背景拍照。','沿海滨继续散步，再另行前往螃蟹市场。'],km:['ចាប់ពីឆ្នេរសាធារណៈក្បែរឆ្នេរកែប។','មើលនិងថតរូបសំណាកពីច្រាំង។','បន្តដើរមាត់សមុទ្រ រួចទៅផ្សារក្តាមដោយឡែក។']},
    photo:{en:'Try a wide frame showing the crab, horizon and passing boats; avoid stepping into traffic for a closer angle.',zh:'建议用广角包含雕像、海平线与船只；不要为了拍摄走入车道。',km:'ថតរូបទូលាយបញ្ចូលក្តាម មេឃ និងទូក កុំឈរលើផ្លូវរថយន្ត។'},
    faq:{en:[{q:'Is this the Crab Market?',a:'No. This is a public statue, while seafood trading takes place elsewhere along the waterfront.'},{q:'Can visitors climb on the statue?',a:'No. View it from the public shore; do not enter the water to approach it.'}],zh:[{q:'雕像就是螃蟹市场吗？',a:'不是。这里是公共地标，海鲜交易在海滨另一处市场进行。'},{q:'可以爬上雕像吗？',a:'不要攀爬或涉水靠近，应从公共岸边欣赏。'}],km:[{q:'តើនេះជាផ្សារក្តាមទេ?',a:'ទេ នេះជារូបសំណាកសាធារណៈ។'},{q:'អាចឡើងលើរូបសំណាក់ទេ?',a:'កុំចូលទឹក ឬឡើងលើរូបសំណាក។'}]},
    mapQuery:'Kep Crab Statue Kep Cambodia',imageSource:'https://commons.wikimedia.org/wiki/File:Kep_Crab_Statue_.jpg',imageAlt:{en:'Kep crab statue above the sea',zh:'凯普海上螃蟹雕像实景',km:'រូបសំណាកក្តាមនៅសមុទ្រកែប'},managementSource:'https://intocambodia.org/content/kep-province',
  },
  'kep-salt-fields': {
    management:{en:'These are active salt-production areas operated by local producers, not one publicly administered attraction with a universal entrance. Access to working pans requires the operator’s permission.',zh:'盐田是由当地生产者经营的实际生产区域，并非有统一入口的公共景区。进入生产盐池应事先取得经营者许可。',km:'ស្រែអំបិលជាកន្លែងផលិតរបស់អ្នកផលិតក្នុងស្រុក មិនមែនជាទីទស្សនាសាធារណៈតែមួយទេ។ ត្រូវសុំការអនុញ្ញាតមុនចូល។'},
    architecture:{en:'Low earthen ridges divide the pans into precise rectangles. Water surfaces, drying beds and shelters show how simple engineering uses sun and wind.',zh:'低矮土埂把盐池分隔成规整方格；蓄水池、晒盐地与简易棚屋展示利用日照与风力的生产工程。',km:'ទំនប់ដីទាបបែងចែកអាងជាចតុកោណ។ អាងទឹក ដីស្ងួត និងខ្ទមបង្ហាញការប្រើថ្ងៃនិងខ្យល់ក្នុងការផលិត។'},
    route:{en:['Choose a publicly accessible roadside viewing point.','Observe the evaporation pans and working areas without crossing barriers.','Continue to a second safe viewpoint only if roads and operators allow it.'],zh:['先选择允许停留的公共路边观察点。','从外侧观察盐池与生产区，不跨越边界。','如果道路和经营者允许，再前往另一处安全视角。'],km:['ជ្រើសកន្លែងមើលពីផ្លូវសាធារណៈ។','មើលអាងដោយមិនឆ្លងព្រំដែនផលិត។','បន្តទៅចំណុចផ្សេងតែបើផ្លូវនិងអ្នកផលិតអនុញ្ញាត។']},
    photo:{en:'The repeating salt-pan geometry and reflections work well in low light; photograph workers only with consent.',zh:'盐池的几何线条与水面倒影适合低角度光线；拍摄工人前请先征得同意。',km:'បន្ទាត់អាងអំបិល និងពន្លឺឆ្លុះល្អសម្រាប់ថតរូប។ សុំការយល់ព្រមមុនថតកម្មករ។'},
    faq:{en:[{q:'Can I walk onto the salt pans?',a:'These are workplaces. Do not enter without operator permission.'},{q:'Is salt harvested all year?',a:'Production depends on the dry season and weather; check locally.'}],zh:[{q:'可以走入盐池吗？',a:'盐田是工作场所，未经允许不要进入。'},{q:'全年都有晒盐吗？',a:'产盐依赖旱季和天气，请现场核实。'}],km:[{q:'អាចចូលអាងអំបិលទេ?',a:'កុំចូលដោយគ្មានការអនុញ្ញាត។'},{q:'ផលិតអំបិលពេញឆ្នាំទេ?',a:'អាស្រ័យលើរដូវប្រាំង និងអាកាសធាតុ។'}]},
    mapQuery:'Kep Salt Fields Kep Province Cambodia',imageSource:'https://commons.wikimedia.org/wiki/File:Salt_fields_in_Kep_Province_(50446944706).jpg',imageAlt:{en:'Salt pans in Kep Province',zh:'凯普省盐田实景',km:'ស្រែអំបិលខេត្តកែប'},managementSource:'https://visitcambodia.info/places/kep-salt-fields/',
  },
  'angkol-beach': {
    management:{en:'Angkol Beach is a coastal destination within Angkol Commune, Damnak Chang’aeur District. Public access and services involve local authorities and individual providers; no single beachwide private operator is assumed.',zh:'安戈尔海滩位于凯普省 Angkol Commune、Damnak Chang’aeur 区。公共通行与海滨服务涉及地方管理和不同经营者，不将整片海岸归属某一家商户。',km:'ឆ្នេរអង្កោលស្ថិតនៅឃុំអង្កោល ស្រុកដំណាក់ចង្អើរ។ ការចូលប្រើនិងសេវាពាក់ព័ន្ធនឹងអាជ្ញាធរ និងអ្នកផ្ដល់សេវាផ្សេងៗ។'},
    architecture:{en:'The coast is characterised by fishing boats, small shade structures and a low shoreline rather than grand monuments. It offers a contrast with central Kep’s developed seafront.',zh:'这里的景观由渔船、简单遮阳设施与平缓海岸组成，不以大型建筑为特色，与凯普市中心较成熟的海滨设施形成对比。',km:'ឆ្នេរមានទូកនេសាទ សំណង់សាមញ្ញ និងច្រាំងទាប ខុសពីឆ្នេរមជ្ឈមណ្ឌលកែប។'},
    route:{en:['Navigate to Angkol Beach rather than central Kep Beach.','Walk along the accessible shore and observe fishing boats without disturbing equipment.','Choose a safe sunset viewpoint and leave enough time for the return journey.'],zh:['导航至安戈尔海滩而非凯普中心海滩。','沿可通行岸线散步，观察渔船但不妨碍作业。','选择安全的晚霞观景点，并预留返程时间。'],km:['ទៅឆ្នេរអង្កោល មិនមែនឆ្នេរកែបកណ្ដាល។','ដើរតាមឆ្នេរដែលអាចចូលបាន និងមើលទូក។','ជ្រើសកន្លែងមើលថ្ងៃលិចសុវត្ថិភាព និងទុកពេលត្រឡប់។']},
    photo:{en:'Use fishing boats and shoreline as foreground for the distant coast; avoid entering private or working areas.',zh:'可用渔船和岸线作为前景拍摄远处海岸，不进入私人或作业区域。',km:'ប្រើទូកនិងច្រាំងជាផ្ទៃមុខសម្រាប់ថតឆ្នេរឆ្ងាយ កុំចូលដីឯកជន។'},
    faq:{en:[{q:'Is Angkol Beach the main Kep Beach?',a:'No. It is a separate coastal area in Damnak Chang’aeur District.'},{q:'Is there a fixed admission fee?',a:'Public shore access and private services differ; ask providers locally.'}],zh:[{q:'安戈尔海滩就是凯普海滩吗？',a:'不是，这是 Damnak Chang’aeur 区的另一段海岸。'},{q:'有统一门票吗？',a:'公共通行与私人服务不同，收费请向现场经营者核实。'}],km:[{q:'តើជាឆ្នេរកែបកណ្ដាលទេ?',a:'ទេ វាជាឆ្នេរផ្សេងក្នុងស្រុកដំណាក់ចង្អើរ។'},{q:'មានថ្លៃចូលថេរទេ?',a:'សួរអ្នកផ្ដល់សេវានៅទីតាំង។'}]},
    mapQuery:'Angkol Beach Damnak Changaeur Kep Cambodia',imageSource:'https://www.guidetrip.info/place/angkol-beach',imageAlt:{en:'Fishing boats and shore at Angkol Beach',zh:'安戈尔海滩渔船及海岸实景',km:'ទូកនេសាទ និងឆ្នេរអង្កោល'},managementSource:'https://visitcambodia.info/places/angkol-beach/',
  },
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
