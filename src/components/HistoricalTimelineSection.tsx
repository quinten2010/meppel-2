"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";

gsap.registerPlugin(ScrollTrigger);

const timelineNodes = [
  { year: 1141, title: "Episcopal Inception", summary: "Meppel first appears in an episcopal charter; a 'buurtschap' of farms on sand ridges strategically placed to avoid seasonal inundations. The name derives from 'Mapuldr,' referencing maple trees on the Reest banks.", key: ["First documented", "Peat extraction begins", "Episcopal interest"], icon: "📜", era: "Formative Era" },
  { year: 1166, title: "Peat Consolidation", summary: "Development of the 'mêpel' spade enabled efficient peat extraction, shifting from subsistence farming to a commodity economy centered on 'het bruine goud' (brown gold).", key: ["Brown gold economy", "Settlement growth", "Specialized tools"], icon: "⛏️", era: "Formative Era" },
  { year: 1191, title: "Water Management", summary: "Rudimentary dikes and drainage ditches protect the 'essen' fields where rye was grown. Early inhabitants organized for hydrological stewardship at this critical juncture.", key: ["Dike construction", "Community organization", "Rye cultivation"], icon: "🛡️", era: "Formative Era" },
  { year: 1216, title: "Parish Dependency", summary: "Population grew as Meppel became vital for tithes to Kolderveen. Residents still traveled to the mother church for sacraments—a significant logistical hurdle in marshy terrain.", key: ["Economic importance", "Religious dependency", "Rye cultivation"], icon: "⛪", era: "Formative Era" },
  { year: 1241, title: "Transshipment Hub", summary: "First wooden quays and 'stapelplaatsen' constructed along the Sethe. Peat extraction altered the landscape, creating 'petgaten' that would become the Weerribben and Wieden regions.", key: ["Trade infrastructure", "Warehouse development", "Ecological shift"], icon: "🏗️", era: "Formative Era" },
  { year: 1266, title: "Feudal Stability", summary: "Twelve 'wijken' overseen by 'rotmeesters' for dike maintenance and militia organization. This decentralized governance prevented rigid regency oligarchy, fostering egalitarian mercantile class.", key: ["Decentralized governance", "Egalitarian trade", "Military organization"], icon: "🏰", era: "Formative Era" },
  { year: 1291, title: "Market Emergence", summary: "Informal markets flourish as Meppel outpaces neighboring settlements. The convergence of Wold Aa and Beilerstroom facilitated grain and cattle transport from Drenthe interior.", key: ["Regional dominance", "Grain & cattle trade", "Connectivity"], icon: "🏛️", era: "Formative Era" },
  { year: 1316, title: "Demographic Resilience", summary: "Isolated position and diversified economy buffer Meppel from wider European famines. Expansion of 'es' lands in Oosterboer accommodates steady growth.", key: ["Population stability", "Livestock focus", "Blight resistance"], icon: "🐄", era: "Formative Era" },
  { year: 1341, title: "Autonomy Movement", summary: "Petitions for independent parish status intensify as enriched inhabitants seek religious and legal autonomy. The first organized crafts guilds emerge during this period.", key: ["Political pressure", "Guild formation", "Economic assertiveness"], icon: "⚖️", era: "Formative Era" },
  { year: 1366, title: "Church Expansion", summary: "Grote Kerk aisle raised; Reformation ideas reach the port community. The shipping community's contact with cosmopolitan hubs makes them receptive to new religious ideas.", key: ["Religious transition", "Architectural growth", "Protestant influence"], icon: "⛪", era: "Autonomy Era" },
  { year: 1391, title: "Legal Autonomy", summary: "Meppel handles legal proceedings for southwestern Drenthe. Merchants and legal professionals settle permanently in the village center, establishing it as a regional capital.", key: ["Municipal power", "Merchant settlement", "Judicial center"], icon: "⚖️", era: "Autonomy Era" },
  { year: 1422, title: "Parish Independence", summary: "Construction of Mariakerk establishes Meppel as independent 'kerspel,' officially separating from Kolderveen. The massive tower serves as navigation point for ships entering the Meppelerdiep.", key: ["Religious center", "City heart", "Navigation beacon"], icon: "⛪", era: "Autonomy Era" },
  { year: 1460, title: "Market Privileges", summary: "Two annual 'jaarmarkten' granted, establishing Meppel as the 'Poort van Drenthe' (Gateway of Drenthe). Rival towns like Steenwijk are surpassed in economic importance.", key: ["Economic victory", "Regional clearinghouse", "Trade fairs"], icon: "⚖️", era: "Autonomy Era" },
  { year: 1487, title: "Weekly Market", summary: "Permission for weekly market accelerates urban growth. The fairs attract traders from throughout the Low Countries, establishing Meppel as a major commercial center.", key: ["Regular commerce", "Urban expansion", "International trade"], icon: "🏛️", era: "Autonomy Era" },
  { year: 1509, title: "Kinckhorst Fortress", summary: "Slot de Kinckhorst constructed by Drost Roelof van Munster as part of campaign to secure Drenthe's independence from Bishop of Utrecht. This brings both significance and vulnerability.", key: ["Strategic importance", "Power struggles", "Military target"], icon: "🏰", era: "Autonomy Era" },
  { year: 1518, title: "Reformation Influence", summary: "Grote Kerk aisle raised as Protestant ideas flourish in shipping community. The 'kerspelhuis' begins serving more secular municipal functions.", key: ["Religious change", "Cultural shift", "Administrative evolution"], icon: "⛪", era: "Autonomy Era" },
  { year: 1541, title: "Peat Hegemony", summary: "Meppelerdiep deepened for larger vessels; peat dominates trade as western cities rely almost exclusively on Drenthe fuel for heating and industrial processes.", key: ["Maritime capacity", "Fuel economy", "Western dependence"], icon: "🚢", era: "Autonomy Era" },
  { year: 1591, title: "Recovery Era", summary: "Post-occupation rebuilding sees 150 professional shippers recorded by 1607. The 1611 bell casting by Arent van de Put symbolizes civic rebirth and commitment to public institutions.", key: ["Economic rebound", "Navigation beacon", "Guild dominance"], icon: "📈", era: "Autonomy Era" },
  { year: 1611, title: "Schippersgilde Power", summary: "Bell casting symbolizes civic rebirth. By 1626, nearly half of Meppel's professional population is directly involved in shipping industry.", key: ["Guild dominance", "Cultural investment", "Industry concentration"], icon: "🔔", era: "Golden Age" },
  { year: 1644, title: "City Rights", summary: "Official city status with expanded civic privileges granted. Population exceeds one thousand permanent residents, making it one of the most significant urban centers in the northeast.", key: ["Municipal autonomy", "Legal framework", "Urban maturity"], icon: "🏰", era: "Golden Age" },
  { year: 1666, title: "Jewish Settlement", summary: "First Jewish settlers arrive, drawn by Meppel's reputation as tolerant market town. They introduce new international trade networks and credit systems to the local economy.", key: ["Community diversity", "International links", "Tolerant culture"], icon: "🕍", era: "Golden Age" },
  { year: 1691, title: "Hoogeveensche Vaart", summary: "New canal streamlines peat transport from Drenthe interior directly to Meppel's harbors. 'Koopman Michiel' arrives in Hoogeveen, signaling broader trade expansion.", key: ["Transport efficiency", "Economic expansion", "Regional integration"], icon: "🚢", era: "Golden Age" },
  { year: 1721, title: "Schnitger Organ", summary: "Monumental organ installed by Jan Harmens Camp and Franz Caspar Schnitger. Meppel gains cultural sophistication matching its economic prosperity.", key: ["Artistic achievement", "Religious pride", "Cultural maturity"], icon: "🎹", era: "Golden Age" },
  { year: 1767, title: "Jewish Cemetery", summary: "Purchase of Het Boddenkampje formalizes Jewish community presence despite municipal attempts to tighten residence requirements. Community contributes significantly to local markets.", key: ["Community permanence", "Religious freedom", "Economic contribution"], icon: "🕍", era: "Golden Age" },
  { year: 1790, title: "Lutheran Church", summary: "Lutheran community builds first and only church in Drenthe. The Grote Kerk undergoes renovation with gothic choir replaced by classicist facade.", key: ["Pluralism", "Architectural change", "Enlightenment taste"], icon: "⛪", era: "Modern Epoch" },
  { year: 1809, title: "French Rights", summary: "Louis Napoleon grants renewed city rights. In 1808, the Jewish community is declared 'Hoofdsynagoge' (central community) for its district.", key: ["Political change", "Modern governance", "Religious recognition"], icon: "🇫🇷", era: "Modern Epoch" },
  { year: 1827, title: "Cupola Addition", summary: "'Open koepeltje' added to church tower, altering skyline permanently. In 1824, rye prices plummeted 65%, driving specialization in livestock trade.", key: ["Architectural icon", "Visual landmark", "Economic shift"], icon: "⛪", era: "Modern Epoch" },
  { year: 1850, title: "Chamber of Commerce", summary: "First Kamer van Koophandel in Drenthe established. In 1853, Meppel becomes residence for provincial chief rabbinate, cementing 'Mokum of the North' status.", key: ["Economic institution", "Business organization", "Religious center"], icon: "🏢", era: "Modern Epoch" },
  { year: 1861, title: "Gasfabriek", summary: "Gas works introduces modern lighting to the city, enabling night-time industrial shifts and improving public safety.", key: ["Technological progress", "Safety improvement", "Industrial capacity"], icon: "⚡", era: "Modern Epoch" },
  { year: 1867, title: "Railway Revolution", summary: "Railway station opens; economic focus shifts from water to rail transport. Connectivity to Balkbrug (1908) later integrates rural hinterland.", key: ["Transportation shift", "Industrial growth", "Regional access"], icon: "🚂", era: "Modern Epoch" },
  { year: 1886, title: "Schouwburg Ogterop", summary: "Regional theater opens, enriching cultural life. Meppel gains reputation as 'Little Rotterdam' during interwar period for economic resilience.", key: ["Arts community", "Entertainment", "Cultural development"], icon: "🎭", era: "Modern Epoch" },
  { year: 1901, title: "Noorderschool", summary: "Vocational education established for northern Dutch youth. The 1909 Landbouwwinterschool enhances regional agricultural expertise.", key: ["Education reform", "Workforce training", "Rural development"], icon: "📚", era: "Modern Epoch" },
  { year: 1928, title: "Modern Harbor", summary: "New harbor accommodates vessels up to 2,000 tons, expanding maritime trade capacity in the industrial age.", key: ["Maritime capacity", "Trade expansion", "Industrial scale"], icon: "🚢", era: "Modern Epoch" },
  { year: 1942, title: "Occupation Tragedy", summary: "Majority of Jewish community deported to extermination camps in October 1942; only 18 individuals returned after the war. Resistance led by figures like Jan Gunnink ('Ome Hein').", key: ["Historical tragedy", "Community loss", "Resistance heroism"], icon: "⚫", era: "Modern Epoch" },
  { year: 1944, title: "Resistance Action", summary: "Jan Gunnink leads daring police station raid during liberation. Post-war reconstruction unfortunately includes demolition of synagogue and canal filling.", key: ["Courageous resistance", "Community heroism", "Liberation struggle"], icon: "⚔️", era: "Modern Epoch" },
  { year: 1966, title: "Canal Infilling", summary: "Historic canals filled for motor traffic accommodation. This drastic reduction in waterway connectivity represents significant heritage loss.", key: ["Urban modernization", "Heritage loss", "Automobile age"], icon: "🚧", era: "Modern Epoch" },
  { year: 1976, title: "Grachtwacht", summary: "Citizen group formed to protect remaining waterways, successfully halting further destruction and ensuring preservation of remaining canals.", key: ["Preservation activism", "Future protection", "Heritage movement"], icon: "💧", era: "Modern Epoch" },
  { year: 1998, title: "Municipal Merger", summary: "Nijeveen merged with Meppel, creating larger administrative unit. 'Berggierslanden' and 'Nieuwveense Landen' developments expand the city.", key: ["Governance change", "Regional integration", "Urban expansion"], icon: "🏢", era: "Millennial City" },
  { year: 2007, title: "Millennium Recognition", summary: "Designated 'Millennium Gemeente' for commitment to global sustainability and social justice. Integration with 'Port of Zwolle' reflects continued evolution.", key: ["Environmental leadership", "Social justice", "Future vision"], icon: "🌍", era: "Millennial City" },
  { year: 2022, title: "Modern Healthcare", summary: "Isala Hospital modernized as regional medical center, representing contemporary infrastructure development and the city's ongoing adaptation to modern needs.", key: ["Health infrastructure", "Community service", "Contemporary development"], icon: "🏥", era: "Millennial City" },
];

export default function HistoricalTimelineSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeNode, setActiveNode] = useState<number | null>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray(".timeline-node").forEach((node) => {
        gsap.fromTo(
          node as HTMLElement,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            scrollTrigger: {
              trigger: node as HTMLElement,
              start: "top bottom-=100",
              toggleActions: "play none none reverse",
            },
            duration: 0.8,
            ease: "power3.out",
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-screen py-40">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-black" />
        <div className="noise" />
      </div>

      <div className="relative z-10 container mx-auto px-4">
        <motion.div
          className="mb-32 text-center"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="mb-8 text-6xl font-bold tracking-tighter text-white md:text-7xl lg:text-8xl">
            Through
            <span className="gradient-text"> Time</span>
          </h2>
          <p className="text-lg text-white/50 max-w-2xl mx-auto">
            Key moments in Meppel&apos;s evolution from settlement to city, organized by 25-year increments
          </p>
        </motion.div>

        <div className="relative mx-auto max-w-5xl">
          <div className="absolute left-1/2 top-0 -translate-x-1/2 h-full w-px bg-gradient-to-b from-transparent via-indigo-500/30 to-transparent" />

          {timelineNodes.map((node, index) => {
            const isWarNode = node.year === 1942 || node.year === 1944;
            return (
              <div
                key={node.year}
                className={`timeline-node relative flex items-center gap-16 mb-20 ${
                  index % 2 === 0 ? "flex-row" : "flex-row-reverse"
                }`}
              >
                <div className={`w-1/2 ${index % 2 === 0 ? "text-right pr-16" : "pl-16"}`}>
                  <motion.div
                    className={`glass-strong rounded-3xl p-8 cursor-pointer inline-block ${
                      isWarNode ? "border border-white/5" : ""
                    }`}
                    onClick={() => setActiveNode(index)}
                    whileHover={isWarNode ? {} : { y: -8, boxShadow: "0 40px 80px rgba(99, 103, 241, 0.15)" }}
                    style={{
                      backgroundColor: isWarNode ? "rgba(0,0,0,0.4)" : undefined,
                    }}
                  >
                    <div className="text-4xl mb-3">{node.icon}</div>
                    <div className="text-5xl font-bold text-white mb-2">{node.year}</div>
                    <div className="text-xl font-semibold text-white/80 mb-3">{node.title}</div>
                    {node.era && (
                      <div className="text-xs uppercase tracking-wider text-indigo-400 mb-2">{node.era}</div>
                    )}
                    <p className="text-white/50 text-sm">{node.summary}</p>
                  </motion.div>
                </div>

                <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-xl">
                  {node.icon}
                </div>

                <div className="w-1/2" />
              </div>
            );
          })}
        </div>

        {activeNode !== null && timelineNodes[activeNode] && (
          <motion.div
            className="fixed inset-40 z-50 mx-auto max-w-2xl my-auto glass-strong rounded-3xl p-12"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            style={{
              backgroundColor: timelineNodes[activeNode].year === 1942 || timelineNodes[activeNode].year === 1944 ? "rgba(10,10,10,0.9)" : undefined,
            }}
          >
            <button
              className="absolute top-6 right-6 text-white/50 hover:text-white"
              onClick={() => setActiveNode(null)}
            >
              ✕
            </button>
            <div className="text-5xl mb-4">{timelineNodes[activeNode].icon}</div>
            <div className="text-6xl font-bold text-white mb-2">{timelineNodes[activeNode].year}</div>
            <div className="text-2xl font-semibold text-white/80 mb-4">{timelineNodes[activeNode].title}</div>
            <p className="text-white/60 mb-6">{timelineNodes[activeNode].summary}</p>
            <ul className="space-y-2">
              {timelineNodes[activeNode].key.map((k) => (
                <li key={k} className="text-white/50">• {k}</li>
              ))}
            </ul>
          </motion.div>
        )}
      </div>
    </section>
  );
}