import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export default function SourcesPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Fixed Header */}
      <div className="fixed top-6 left-6 z-50">
        <Link 
          to="/"
          className="text-white/60 hover:text-white font-light tracking-wider text-sm uppercase transition-colors duration-500"
        >
          ← RETURN TO JOURNEY
        </Link>
      </div>

      {/* Content */}
      <div className="pt-24 pb-16 px-4 md:px-8 lg:px-12 xl:px-16 max-w-6xl mx-auto">
        {/* Title */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-6">
            Primary Sources
          </h1>
          <div className="w-24 h-px bg-white/30 mx-auto"></div>
        </div>

        {/* Sources Content */}
        <div className="space-y-12">
          {/* Climate & Environmental Data */}
          <section className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold text-white border-b border-white/20 pb-3">
              Climate & Environmental Data
            </h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-blue-300 mb-3">Sea-Level Rise</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• NASA Sea Level Change Team – Projections for Pacific Islands<br />
                    <a href="https://sealevel.nasa.gov" className="text-blue-400 hover:text-blue-300 underline text-sm">
                      https://sealevel.nasa.gov
                    </a>
                  </li>
                  <li>• Pacific Climate Change Science Program (Australia)<br />
                    <a href="https://www.pacificclimatechangescience.org" className="text-blue-400 hover:text-blue-300 underline text-sm">
                      https://www.pacificclimatechangescience.org
                    </a>
                  </li>
                  <li>• RCCAP Fiji Climate Summary<br />
                    <a href="https://www.rccap.org/uploads/files/Fiji_NextGen_Climate_Summary_Slides.pdf" className="text-blue-400 hover:text-blue-300 underline text-sm">
                      https://www.rccap.org/uploads/files/Fiji_NextGen_Climate_Summary_Slides.pdf
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-blue-300 mb-3">Coastal Flooding</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• NASA projections for Tuvalu and analog islands<br />
                    <a href="https://www.rnz.co.nz/international/pacific-news/529117/nasa-predicts-15cm-of-sea-level-rise" className="text-blue-400 hover:text-blue-300 underline text-sm">
                      https://www.rnz.co.nz/international/pacific-news/529117/nasa-predicts-15cm-of-sea-level-rise
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-blue-300 mb-3">Coral Reef Bleaching</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• IPCC Special Report on 1.5°C</li>
                  <li>• Reef Resilience Network<br />
                    <a href="https://reefresilience.org/bleaching/mass-bleaching/" className="text-blue-400 hover:text-blue-300 underline text-sm">
                      https://reefresilience.org/bleaching/mass-bleaching/
                    </a>
                  </li>
                  <li>• Coral Guardian<br />
                    <a href="https://www.coralguardian.org/en/the-ipcc-recommends-coral-restoration/" className="text-blue-400 hover:text-blue-300 underline text-sm">
                      https://www.coralguardian.org/en/the-ipcc-recommends-coral-restoration/
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-blue-300 mb-3">Fisheries & Ocean Resources</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• FAO – Future catches from coastal fisheries<br />
                    <a href="https://www.fao.org/4/i3159e/i3159e.pdf" className="text-blue-400 hover:text-blue-300 underline text-sm">
                      https://www.fao.org/4/i3159e/i3159e.pdf
                    </a>
                  </li>
                  <li>• University of Wollongong – Fish stock decline projections<br />
                    <a href="https://www.uow.edu.au/media/2020/tropical-fisheries-projected-to-decline-40-per-cent-by-2050s-.php" className="text-blue-400 hover:text-blue-300 underline text-sm">
                      https://www.uow.edu.au/media/2020/tropical-fisheries-projected-to-decline-40-per-cent-by-2050s-.php
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Social Impact & Displacement */}
          <section className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold text-white border-b border-white/20 pb-3">
              Social Impact & Displacement
            </h2>
            
            <div>
              <h3 className="text-xl font-semibold text-blue-300 mb-3">Village Relocation & Displacement</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• Fiji Government Planned Relocation Guidelines</li>
                <li>• UNFCCC – Fiji climate migration studies<br />
                  <a href="https://unfccc.int/news/how-fiji-is-impacted-by-climate-change" className="text-blue-400 hover:text-blue-300 underline text-sm">
                    https://unfccc.int/news/how-fiji-is-impacted-by-climate-change
                  </a>
                </li>
                <li>• FM Review – Pacific Mobilities<br />
                  <a href="https://www.fmreview.org/issue64/pacific-mobilities" className="text-blue-400 hover:text-blue-300 underline text-sm">
                    https://www.fmreview.org/issue64/pacific-mobilities
                  </a>
                </li>
                <li>• Berkeley Belonging Institute – Fiji Climate Displacement Case<br />
                  <a href="https://belonging.berkeley.edu/climatedisplacement/case-studies/fiji" className="text-blue-400 hover:text-blue-300 underline text-sm">
                    https://belonging.berkeley.edu/climatedisplacement/case-studies/fiji
                  </a>
                </li>
              </ul>
            </div>
          </section>

          {/* Economic Impact & Infrastructure Risk */}
          <section className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold text-white border-b border-white/20 pb-3">
              Economic Impact & Infrastructure Risk
            </h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-blue-300 mb-3">GDP Loss</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• IMF Climate Risk & GDP Report (2025)<br />
                    <a href="https://www.elibrary.imf.org/view/journals/018/2025/085/article-A001-en.xml" className="text-blue-400 hover:text-blue-300 underline text-sm">
                      https://www.elibrary.imf.org/view/journals/018/2025/085/article-A001-en.xml
                    </a>
                  </li>
                  <li>• World Bank / GFDRR – Pacific disaster and resilience costs</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-blue-300 mb-3">Infrastructure at Risk</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• Merschroth et al. (2020) – Buildings inundated by 2050<br />
                    <a href="https://ucrisportal.univie.ac.at/en/publications/lost-material-stock-in-buildings-due-to-sea-level-rise-from-globa" className="text-blue-400 hover:text-blue-300 underline text-sm">
                      https://ucrisportal.univie.ac.at/en/publications/lost-material-stock-in-buildings-due-to-sea-level-rise-from-globa
                    </a>
                  </li>
                  <li>• PreventionWeb – Pacific urban infrastructure exposure<br />
                    <a href="https://www.preventionweb.net/news/pacific-island-builders-must-factor-sea-level-rise" className="text-blue-400 hover:text-blue-300 underline text-sm">
                      https://www.preventionweb.net/news/pacific-island-builders-must-factor-sea-level-rise
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Energy & Mitigation Pathways */}
          <section className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold text-white border-b border-white/20 pb-3">
              Energy & Mitigation Pathways
            </h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-blue-300 mb-3">Energy Mix & Renewables</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• Energypedia – Fiji energy mix and targets<br />
                    <a href="https://energypedia.info/wiki/Fiji_Energy_Situation" className="text-blue-400 hover:text-blue-300 underline text-sm">
                      https://energypedia.info/wiki/Fiji_Energy_Situation
                    </a>
                  </li>
                  <li>• Fiji Government Energy Roadmap (100% renewable by 2030 target)</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-blue-300 mb-3">Emissions Scenarios & Global Warming</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• IPCC 1.5°C / 2.5°C / 4°C trajectory baselines used in model</li>
                  <li>• Referenced in: Choose Your Pacific Future – A Sound-Driven Data Journey to 2050</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Game Framework & Logic */}
          <section className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold text-white border-b border-white/20 pb-3">
              Game Framework & Logic
            </h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-blue-300 mb-3">Climate Indicator Table</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• Source: Fiji Climate Impact Indicators (2025 vs 2050) – Compiled from NASA, IPCC, IMF, Fiji Government</li>
                  <li>[Internal PDF Dataset – cited in-game and result logic]</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-blue-300 mb-3">Narrative Outcome Mapping</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• Source: outcomes.json – Six scenario narratives</li>
                  <li>• Includes combinations of low/medium/high climate scenarios + resilience levels</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-blue-300 mb-3">Game Decision Questions</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• Source: questions.json – 10 structured climate decisions, each mapped to mitigation and resilience scores</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-blue-300 mb-3">BP2050 Strategic Indicator Links</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• Source: BP2050_Game_Mapping.json</li>
                  <li>• Each question maps to a Blue Pacific 2050 metric (e.g. marine protection, renewable %, food security)</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Sound & Audio Sources */}
          <section className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold text-white border-b border-white/20 pb-3">
              Sound & Audio Sources
            </h2>
            
            <div>
              <h3 className="text-xl font-semibold text-blue-300 mb-3">Tide Sonification Logic</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• Suva Harbor tide data reference<br />
                  <a href="https://www.tide-forecast.com/locations/Suva-Harbor-Fiji-Islands/tides/latest" className="text-blue-400 hover:text-blue-300 underline text-sm">
                    https://www.tide-forecast.com/locations/Suva-Harbor-Fiji-Islands/tides/latest
                  </a>
                </li>
                <li>• 2050 Ocean Audio Tracks (created by user):<br />
                  Low: calm tide / Medium: wind & wave / High: storm surge
                </li>
                <li>• Referenced in: Choose Your Pacific Future – A Sound-Driven Data Journey to 2050</li>
              </ul>
            </div>
          </section>

          {/* Strategy Framework Alignment */}
          <section className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold text-white border-b border-white/20 pb-3">
              Strategy Framework Alignment
            </h2>
            
            <div>
              <h3 className="text-xl font-semibold text-blue-300 mb-3">Blue Pacific 2050 Strategy & Dashboard</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• Strategy Site<br />
                  <a href="https://blue-pacific-2050.pacificdata.org" className="text-blue-400 hover:text-blue-300 underline text-sm">
                    https://blue-pacific-2050.pacificdata.org
                  </a>
                </li>
                <li>• Indicator Dashboard<br />
                  <a href="https://pacificdata.org" className="text-blue-400 hover:text-blue-300 underline text-sm">
                    https://pacificdata.org
                  </a>
                </li>
              </ul>
            </div>
          </section>
        </div>

        {/* Navigation */}
        <div className="text-center mt-16 pt-8 border-t border-white/20">
          <Button 
            variant="pacific" 
            size="pacific"
            onClick={() => window.location.href = '/'}
          >
            RETURN TO JOURNEY
          </Button>
        </div>
      </div>
    </div>
  );
}