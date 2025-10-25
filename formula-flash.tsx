import React, { useState } from 'react';
import { BookOpen, Zap, ChevronDown, ChevronUp, RotateCcw, Atom, Calculator, Lightbulb, Search } from 'lucide-react';

// Complete Physics formulas from your PDF
const subjectsData = {
  physics: {
    name: "Physics",
    icon: Zap,
    chapters: {
      kinematics: {
        title: "Kinematics & Rectilinear Motion",
        formulas: [
          { id: "k1", name: "Average Velocity", formula: "v̄ = Δr/Δt", description: "Total displacement divided by total time taken" },
          { id: "k2", name: "Instantaneous Velocity", formula: "v = dr/dt", description: "Velocity at a specific instant, derivative of position" },
          { id: "k3", name: "Average Acceleration", formula: "ā = Δv/Δt", description: "Change in velocity divided by time interval" },
          { id: "k4", name: "First Equation of Motion", formula: "v = u + at", description: "Final velocity with constant acceleration" },
          { id: "k5", name: "Second Equation of Motion", formula: "s = ut + ½at²", description: "Displacement with constant acceleration" },
          { id: "k6", name: "Third Equation of Motion", formula: "v² = u² + 2as", description: "Velocity-displacement relation" },
          { id: "k7", name: "Average Velocity Formula", formula: "s = (u+v)t/2", description: "Displacement using average of initial and final velocity" },
          { id: "k8", name: "Free Fall (Time)", formula: "v = gt", description: "Velocity of freely falling body (u=0)" },
          { id: "k9", name: "Free Fall (Displacement)", formula: "s = ½gt²", description: "Distance fallen in time t" },
          { id: "k10", name: "Free Fall (Velocity)", formula: "v² = 2gs", description: "Final velocity after falling distance s" }
        ]
      },
      projectile: {
        title: "Projectile Motion",
        formulas: [
          { id: "p1", name: "Time of Flight", formula: "T = 2u sinθ/g", description: "Total time projectile stays in air" },
          { id: "p2", name: "Horizontal Range", formula: "R = u² sin2θ/g", description: "Maximum horizontal distance covered" },
          { id: "p3", name: "Maximum Height", formula: "H = u² sin²θ/2g", description: "Peak height reached by projectile" },
          { id: "p4", name: "Trajectory Equation", formula: "y = x tanθ - gx²/(2u²cos²θ)", description: "Path followed by projectile (parabola)" },
          { id: "p5", name: "Range on Incline (Up)", formula: "R = u² sin(θ-α)/[g cos²α]", description: "Range when projected up an inclined plane" }
        ]
      },
      lawsOfMotion: {
        title: "Laws of Motion & Forces",
        formulas: [
          { id: "l1", name: "Newton's Second Law", formula: "F = ma", description: "Force equals mass times acceleration" },
          { id: "l2", name: "Momentum", formula: "p = mv", description: "Linear momentum of a body" },
          { id: "l3", name: "Force (momentum form)", formula: "F = dp/dt", description: "Rate of change of momentum" },
          { id: "l4", name: "Newton's Third Law", formula: "F_AB = -F_BA", description: "Action and reaction are equal and opposite" },
          { id: "l5", name: "Spring Force", formula: "F = -kx", description: "Restoring force in a spring (Hooke's Law)" },
          { id: "l6", name: "Springs in Series", formula: "1/k_eq = 1/k₁ + 1/k₂", description: "Equivalent spring constant for series combination" },
          { id: "l7", name: "Springs in Parallel", formula: "k_eq = k₁ + k₂", description: "Equivalent spring constant for parallel combination" },
          { id: "l8", name: "Atwood Machine (a)", formula: "a = (m₂-m₁)g/(m₁+m₂)", description: "Acceleration in pulley system with two masses" },
          { id: "l9", name: "Atwood Machine (T)", formula: "T = 2m₁m₂g/(m₁+m₂)", description: "Tension in string of Atwood machine" }
        ]
      },
      friction: {
        title: "Friction",
        formulas: [
          { id: "f1", name: "Kinetic Friction", formula: "f_k = μ_k N", description: "Friction when object is moving" },
          { id: "f2", name: "Static Friction (max)", formula: "f_s(max) = μ_s N", description: "Maximum static friction before motion begins" },
          { id: "f3", name: "Static Friction Range", formula: "0 ≤ f_s ≤ μ_s N", description: "Static friction is self-adjusting up to maximum" }
        ]
      },
      workEnergy: {
        title: "Work, Energy & Power",
        formulas: [
          { id: "w1", name: "Work Done", formula: "W = F·s = Fs cosθ", description: "Work done by constant force" },
          { id: "w2", name: "Work by Variable Force", formula: "W = ∫F·ds", description: "Work done when force varies with position" },
          { id: "w3", name: "Kinetic Energy", formula: "KE = ½mv²", description: "Energy due to motion of body" },
          { id: "w4", name: "Momentum-KE Relation", formula: "KE = p²/2m", description: "Kinetic energy in terms of momentum" },
          { id: "w5", name: "Momentum Formula", formula: "p = √(2mKE)", description: "Momentum from kinetic energy" },
          { id: "w6", name: "Potential Energy", formula: "ΔU = -∫F·dr", description: "Change in potential energy from conservative force" },
          { id: "w7", name: "Conservative Force", formula: "F = -dU/dr", description: "Force is negative gradient of potential energy" },
          { id: "w8", name: "Work-Energy Theorem", formula: "W = ΔKE", description: "Net work equals change in kinetic energy" },
          { id: "w9", name: "Power (average)", formula: "P = W/t", description: "Rate of doing work" },
          { id: "w10", name: "Power (instantaneous)", formula: "P = F·v", description: "Power as dot product of force and velocity" }
        ]
      },
      circular: {
        title: "Circular Motion",
        formulas: [
          { id: "c1", name: "Angular Velocity", formula: "ω = dθ/dt", description: "Rate of change of angular displacement" },
          { id: "c2", name: "Angular Acceleration", formula: "α = dω/dt", description: "Rate of change of angular velocity" },
          { id: "c3", name: "Linear-Angular Velocity", formula: "v = rω", description: "Relation between linear and angular velocity" },
          { id: "c4", name: "Tangential Acceleration", formula: "a_t = rα", description: "Component of acceleration changing speed" },
          { id: "c5", name: "Centripetal Acceleration", formula: "a_c = v²/r = ω²r", description: "Acceleration towards center of circular path" },
          { id: "c6", name: "Total Acceleration", formula: "a = √(a_t² + a_c²)", description: "Magnitude of net acceleration in circular motion" },
          { id: "c7", name: "Angular Equations (1)", formula: "ω = ω₀ + αt", description: "Angular velocity with constant angular acceleration" },
          { id: "c8", name: "Angular Equations (2)", formula: "θ = ω₀t + ½αt²", description: "Angular displacement with constant acceleration" },
          { id: "c9", name: "Angular Equations (3)", formula: "ω² = ω₀² + 2αθ", description: "Angular velocity-displacement relation" },
          { id: "c10", name: "Safe Speed (Level Road)", formula: "v_max = √(μgr)", description: "Maximum speed without skidding on level curve" },
          { id: "c11", name: "Banking Angle (No Friction)", formula: "tanθ = v²/rg", description: "Ideal banking angle for given speed" },
          { id: "c12", name: "Conical Pendulum Period", formula: "T = 2π√(Lcosθ/g)", description: "Time period of conical pendulum" }
        ]
      },
      centerOfMass: {
        title: "Centre of Mass & Momentum",
        formulas: [
          { id: "cm1", name: "Centre of Mass (2 particles)", formula: "r_cm = (m₁r₁ + m₂r₂)/(m₁+m₂)", description: "Position of center of mass for two particles" },
          { id: "cm2", name: "Centre of Mass (system)", formula: "r_cm = Σm_i r_i / M", description: "General formula for system of particles" },
          { id: "cm3", name: "Velocity of CM", formula: "v_cm = (Σm_i v_i)/M", description: "Velocity of center of mass" },
          { id: "cm4", name: "System Momentum", formula: "P = Mv_cm", description: "Total momentum equals mass times CM velocity" },
          { id: "cm5", name: "Acceleration of CM", formula: "a_cm = F_ext/M", description: "Only external forces affect CM motion" },
          { id: "cm6", name: "Impulse-Momentum", formula: "J = Δp = ∫Fdt", description: "Impulse equals change in momentum" },
          { id: "cm7", name: "Coefficient of Restitution", formula: "e = v_separation/v_approach", description: "Ratio of relative velocities in collision" },
          { id: "cm8", name: "Thrust Force", formula: "F_t = v_rel (dm/dt)", description: "Force due to mass ejection (rockets)" }
        ]
      },
      rotation: {
        title: "Rotational Motion & Rigid Bodies",
        formulas: [
          { id: "r1", name: "Moment of Inertia (particle)", formula: "I = mr²", description: "Rotational inertia of point mass" },
          { id: "r2", name: "Moment of Inertia (system)", formula: "I = Σm_i r_i²", description: "Total moment of inertia for discrete particles" },
          { id: "r3", name: "Parallel Axis Theorem", formula: "I_AB = I_cm + Md²", description: "Moment of inertia about parallel axis" },
          { id: "r4", name: "Perpendicular Axis Theorem", formula: "I_z = I_x + I_y", description: "For planar objects only" },
          { id: "r5", name: "Radius of Gyration", formula: "I = MK²", description: "K is radius of gyration" },
          { id: "r6", name: "Torque", formula: "τ = r × F = rF sinθ", description: "Rotational analogue of force" },
          { id: "r7", name: "Torque-Angular Acceleration", formula: "τ_ext = Iα", description: "Rotational analogue of Newton's second law" },
          { id: "r8", name: "Rotational KE", formula: "KE_rot = ½Iω²", description: "Kinetic energy due to rotation" },
          { id: "r9", name: "Angular Momentum", formula: "L = Iω", description: "Angular momentum of rotating rigid body" },
          { id: "r10", name: "Torque-Angular Momentum", formula: "τ = dL/dt", description: "Torque is rate of change of angular momentum" },
          { id: "r11", name: "Total KE (Rolling)", formula: "KE = ½Mv_cm² + ½I_cm ω²", description: "Translation plus Rotation energy" },
          { id: "r12", name: "I (Solid Sphere)", formula: "I = (2/5)MR²", description: "About diameter" },
          { id: "r13", name: "I (Hollow Sphere)", formula: "I = (2/3)MR²", description: "About diameter" },
          { id: "r14", name: "I (Ring)", formula: "I = MR²", description: "About axis through center perpendicular to plane" },
          { id: "r15", name: "I (Disc)", formula: "I = ½MR²", description: "About axis through center perpendicular to plane" },
          { id: "r16", name: "I (Rod, center)", formula: "I = ML²/12", description: "About perpendicular axis through center" }
        ]
      },
      shm: {
        title: "Simple Harmonic Motion",
        formulas: [
          { id: "s1", name: "SHM Force", formula: "F = -kx", description: "Restoring force proportional to displacement" },
          { id: "s2", name: "SHM Equation", formula: "x = A sin(ωt + φ)", description: "Displacement as function of time" },
          { id: "s3", name: "Angular Frequency", formula: "ω = 2πf = 2π/T", description: "Relates frequency and time period" },
          { id: "s4", name: "Time Period", formula: "T = 2π√(m/k)", description: "Period of oscillation for spring-mass system" },
          { id: "s5", name: "Velocity in SHM", formula: "v = ω√(A² - x²)", description: "Speed at displacement x" },
          { id: "s6", name: "Max Velocity", formula: "v_max = Aω", description: "Maximum speed at mean position" },
          { id: "s7", name: "Acceleration in SHM", formula: "a = -ω²x", description: "Acceleration proportional to displacement" },
          { id: "s8", name: "Max Acceleration", formula: "a_max = Aω²", description: "Maximum acceleration at extreme position" },
          { id: "s9", name: "KE in SHM", formula: "KE = ½k(A² - x²)", description: "Kinetic energy at displacement x" },
          { id: "s10", name: "PE in SHM", formula: "PE = ½kx²", description: "Potential energy at displacement x" },
          { id: "s11", name: "Total Energy", formula: "E = ½kA²", description: "Constant total mechanical energy in SHM" },
          { id: "s12", name: "Simple Pendulum", formula: "T = 2π√(L/g)", description: "Time period of simple pendulum" }
        ]
      },
      waves: {
        title: "Waves & Sound",
        formulas: [
          { id: "wv1", name: "Wave Equation", formula: "y = A sin(ωt - kx + φ)", description: "General equation for sinusoidal wave" },
          { id: "wv2", name: "Wave Velocity", formula: "v = fλ", description: "Speed of wave propagation" },
          { id: "wv3", name: "Wave Number", formula: "k = 2π/λ", description: "Spatial frequency of wave" },
          { id: "wv4", name: "Phase Difference (space)", formula: "Δφ = (2π/λ)Δx", description: "Phase difference due to path difference" },
          { id: "wv5", name: "Phase Difference (time)", formula: "Δφ = (2π/T)Δt", description: "Phase difference due to time difference" },
          { id: "wv6", name: "String Wave Speed", formula: "v = √(T/μ)", description: "Speed of transverse wave on string (T=tension, μ=mass/length)" },
          { id: "wv7", name: "Power in Wave", formula: "P = 2π²f²A²vμ", description: "Average power transmitted by wave on string" },
          { id: "wv8", name: "Standing Wave", formula: "y = 2A cos(kx) sin(ωt)", description: "Superposition of two opposite traveling waves" },
          { id: "wv9", name: "Node-Node Distance", formula: "Δx = λ/2", description: "Distance between consecutive nodes" },
          { id: "wv10", name: "Node-Antinode Distance", formula: "Δx = λ/4", description: "Distance between node and adjacent antinode" },
          { id: "wv11", name: "String (Both Ends Fixed)", formula: "f_n = n(v/2L)", description: "Frequencies of standing waves, n=1,2,3..." },
          { id: "wv12", name: "String (One End Free)", formula: "f_n = (2n-1)(v/4L)", description: "Frequencies for one free end, n=1,2,3..." }
        ]
      },
      thermodynamics: {
        title: "Heat & Thermodynamics",
        formulas: [
          { id: "t1", name: "Translational KE", formula: "KE = (3/2)nRT", description: "Total kinetic energy of gas molecules" },
          { id: "t2", name: "RMS Speed", formula: "v_rms = √(3RT/M) = √(3kT/m)", description: "Root mean square speed of gas molecules" },
          { id: "t3", name: "Average Speed", formula: "v_avg = √(8RT/πM)", description: "Mean speed of gas molecules" },
          { id: "t4", name: "Most Probable Speed", formula: "v_mp = √(2RT/M)", description: "Most likely speed in Maxwell distribution" },
          { id: "t5", name: "Speed Relation", formula: "v_mp : v_avg : v_rms = 1 : 1.13 : 1.22", description: "Ratio of different speeds" },
          { id: "t6", name: "Internal Energy", formula: "U = (f/2)nRT", description: "Internal energy of ideal gas (f=degrees of freedom)" },
          { id: "t7", name: "Isothermal Work", formula: "W = nRT ln(V_f/V_i)", description: "Work done in isothermal process" },
          { id: "t8", name: "First Law", formula: "ΔQ = ΔU + ΔW", description: "Energy conservation in thermodynamics" },
          { id: "t9", name: "Isothermal (ΔU)", formula: "ΔU = 0", description: "No change in internal energy (T=constant)" },
          { id: "t10", name: "Isochoric (W)", formula: "W = 0", description: "No work done (V=constant)" },
          { id: "t11", name: "Isochoric (Q)", formula: "Q = nC_v ΔT", description: "Heat absorbed at constant volume" },
          { id: "t12", name: "Degrees of Freedom", formula: "f = 3 (mono), 5 (dia), 6 (poly)", description: "For monoatomic, diatomic, polyatomic gases" }
        ]
      }
    }
  },
  chemistry: {
    name: "Chemistry",
    icon: Atom,
    chapters: {
      placeholder1: { title: "Physical Chemistry - Coming Soon", formulas: [] },
      placeholder2: { title: "Organic Chemistry - Coming Soon", formulas: [] },
      placeholder3: { title: "Inorganic Chemistry - Coming Soon", formulas: [] }
    }
  },
  math: {
    name: "Mathematics",
    icon: Calculator,
    chapters: {
      placeholder1: { title: "Algebra - Coming Soon", formulas: [] },
      placeholder2: { title: "Calculus - Coming Soon", formulas: [] },
      placeholder3: { title: "Trigonometry - Coming Soon", formulas: [] }
    }
  }
};

function FormulaFlash() {
  const [selectedSubject, setSelectedSubject] = useState('physics');
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [flippedCards, setFlippedCards] = useState({});
  const [searchTerm, setSearchTerm] = useState('');

  const toggleCard = (id) => {
    setFlippedCards(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const toggleChapter = (chapter) => {
    setSelectedChapter(selectedChapter === chapter ? null : chapter);
  };

  const currentSubject = subjectsData[selectedSubject];
  const SubjectIcon = currentSubject.icon;

  const totalFormulas = Object.values(currentSubject.chapters).reduce(
    (sum, chapter) => sum + chapter.formulas.length, 0
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3 mb-4">
            <Lightbulb className="w-8 h-8 text-gray-900" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">FormulaFlash</h1>
              <p className="text-sm text-gray-600">Complete JEE Formula Bank</p>
            </div>
          </div>

          <div className="flex gap-2 mb-3">
            {Object.entries(subjectsData).map(([key, subject]) => {
              const Icon = subject.icon;
              return (
                <button
                  key={key}
                  onClick={() => {
                    setSelectedSubject(key);
                    setSelectedChapter(null);
                  }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                    selectedSubject === key
                      ? 'bg-gray-900 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {subject.name}
                </button>
              );
            })}
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search formulas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-900"
            />
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
          <div className="flex items-start gap-4">
            <SubjectIcon className="w-6 h-6 text-gray-700 flex-shrink-0 mt-1" />
            <div className="flex-1">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                {currentSubject.name} Formula Bank
              </h2>
              <p className="text-gray-700 mb-2">
                {totalFormulas > 0 ? (
                  <>
                    <span className="font-semibold text-gray-900">{totalFormulas} formulas</span> ready for quick revision.
                    Click any chapter to expand, then tap cards to flip and see descriptions.
                  </>
                ) : (
                  "Content coming soon! Physics formulas are already available."
                )}
              </p>
              <div className="flex gap-4 text-sm text-gray-600 mt-3">
                <span>Tip: Use search to find specific formulas quickly</span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          {Object.entries(currentSubject.chapters).map(([key, chapter]) => {
            const filteredFormulas = searchTerm
              ? chapter.formulas.filter(f => 
                  f.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  f.formula.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  f.description.toLowerCase().includes(searchTerm.toLowerCase())
                )
              : chapter.formulas;

            if (searchTerm && filteredFormulas.length === 0) return null;

            return (
              <div key={key} className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleChapter(key)}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <h3 className="text-lg font-semibold text-gray-900">{chapter.title}</h3>
                    <span className="text-sm text-gray-500">
                      ({filteredFormulas.length} formulas)
                    </span>
                  </div>
                  {selectedChapter === key ? (
                    <ChevronUp className="w-5 h-5 text-gray-600" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-600" />
                  )}
                </button>

                {selectedChapter === key && (
                  <div className="border-t border-gray-200 p-6 bg-gray-50">
                    {filteredFormulas.length === 0 ? (
                      <div className="text-center py-8 text-gray-500">
                        <p>Formulas coming soon for this chapter.</p>
                        <p className="text-sm mt-2">We are working on adding comprehensive content!</p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {filteredFormulas.map((formula) => (
                          <div
                            key={formula.id}
                            onClick={() => toggleCard(formula.id)}
                            className="bg-white border-2 border-gray-300 rounded-lg p-6 cursor-pointer hover:border-gray-900 transition-all min-h-[160px] flex flex-col justify-center"
                          >
                            {!flippedCards[formula.id] ? (
                              <div className="text-center">
                                <p className="text-sm text-gray-600 mb-3 font-medium">{formula.name}</p>
                                <p className="text-2xl font-mono font-semibold text-gray-900 my-4">
                                  {formula.formula}
                                </p>
                                <p className="text-xs text-gray-400 mt-3">Click to see description</p>
                              </div>
                            ) : (
                              <div className="text-center">
                                <p className="text-sm font-medium text-gray-900 mb-2">{formula.name}</p>
                                <p className="text-gray-700 text-sm leading-relaxed">{formula.description}</p>
                                <button className="mt-4 text-sm text-gray-500 flex items-center gap-1 mx-auto hover:text-gray-700">
                                  <RotateCcw className="w-4 h-4" />
                                  Flip back
                                </button>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center text-sm text-gray-500 space-y-2">
          <p>{totalFormulas} JEE Physics formulas ready for revision</p>
          <p>Coming soon: Chemistry and Math formulas, Quiz Mode, PDF Export, Favorites</p>
        </div>
      </main>

      <footer className="border-t border-gray-200 mt-16 py-8 bg-white">
        <div className="max-w-6xl mx-auto px-4 text-center text-gray-600">
          <p className="text-sm font-medium">FormulaFlash - Complete JEE Formula Bank</p>
          <p className="text-xs mt-2 text-gray-500">Physics - Chemistry - Mathematics</p>
          <p className="text-xs mt-1 text-gray-400">Built by students, for students</p>
        </div>
      </footer>
    </div>
  );
}

export default FormulaFlash;
