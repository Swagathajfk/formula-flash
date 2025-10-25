import React, { useState } from 'react';
import { BookOpen, Zap, ChevronDown, ChevronUp, RotateCcw, Atom, Calculator, Lightbulb } from 'lucide-react';

// All subjects data structure
const subjectsData = {
  physics: {
    name: "Physics",
    icon: Zap,
    chapters: {
      kinematics: { title: "Kinematics", formulas: [] },
      lawsOfMotion: { title: "Laws of Motion", formulas: [] },
      workEnergyPower: { title: "Work, Energy & Power", formulas: [] },
      rotationalMotion: { title: "Rotational Motion", formulas: [] },
      shm: { title: "Simple Harmonic Motion", formulas: [] },
      waves: { title: "Waves", formulas: [] },
      gravitation: { title: "Gravitation", formulas: [] },
      thermodynamics: { title: "Thermodynamics", formulas: [] },
      electrostatics: { title: "Electrostatics", formulas: [] },
      currentElectricity: { title: "Current Electricity", formulas: [] },
      magnetism: { title: "Magnetism", formulas: [] },
      emi: { title: "Electromagnetic Induction", formulas: [] },
      optics: { title: "Optics", formulas: [] },
      modernPhysics: { title: "Modern Physics", formulas: [] }
    }
  },
  chemistry: {
    name: "Chemistry",
    icon: Atom,
    chapters: {
      physicalChemistry: { title: "Physical Chemistry - Basics", formulas: [] },
      thermochemistry: { title: "Thermochemistry", formulas: [] },
      equilibrium: { title: "Chemical Equilibrium", formulas: [] },
      ionicEquilibrium: { title: "Ionic Equilibrium", formulas: [] },
      electrochemistry: { title: "Electrochemistry", formulas: [] },
      chemicalKinetics: { title: "Chemical Kinetics", formulas: [] },
      organicBasics: { title: "Organic Chemistry - Basics", formulas: [] },
      organicReactions: { title: "Organic Reactions", formulas: [] },
      aromaticCompounds: { title: "Aromatic Compounds", formulas: [] },
      inorganicPeriodic: { title: "Periodic Table & Properties", formulas: [] },
      coordination: { title: "Coordination Compounds", formulas: [] },
      metallurgy: { title: "Metallurgy", formulas: [] }
    }
  },
  math: {
    name: "Mathematics",
    icon: Calculator,
    chapters: {
      algebra: { title: "Algebra - Basics", formulas: [] },
      quadratic: { title: "Quadratic Equations", formulas: [] },
      sequences: { title: "Sequences & Series", formulas: [] },
      permutations: { title: "Permutations & Combinations", formulas: [] },
      binomial: { title: "Binomial Theorem", formulas: [] },
      trigonometry: { title: "Trigonometry", formulas: [] },
      trigonometricEquations: { title: "Trigonometric Equations", formulas: [] },
      calculus: { title: "Limits & Continuity", formulas: [] },
      differentiation: { title: "Differentiation", formulas: [] },
      integration: { title: "Integration", formulas: [] },
      definiteIntegrals: { title: "Definite Integrals", formulas: [] },
      differentialEquations: { title: "Differential Equations", formulas: [] },
      vectors: { title: "Vectors", formulas: [] },
      threeDGeometry: { title: "3D Geometry", formulas: [] },
      coordinateGeometry: { title: "Coordinate Geometry", formulas: [] },
      probability: { title: "Probability", formulas: [] },
      matrices: { title: "Matrices & Determinants", formulas: [] }
    }
  }
};

function FormulaFlash() {
  const [selectedSubject, setSelectedSubject] = useState('physics');
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [flippedCards, setFlippedCards] = useState({});

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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center gap-3 mb-4">
            <Lightbulb className="w-8 h-8 text-gray-900" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">FormulaFlash</h1>
              <p className="text-sm text-gray-600">Complete JEE Formula Bank - Physics, Chemistry & Math</p>
            </div>
          </div>

          {/* Subject Tabs */}
          <div className="flex gap-2">
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
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        
        {/* Info Banner */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
          <div className="flex items-start gap-4">
            <SubjectIcon className="w-6 h-6 text-gray-700 flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                {currentSubject.name} - Formula Bank
              </h2>
              <p className="text-gray-700 mb-2">
                All essential {currentSubject.name.toLowerCase()} formulas for JEE organized by chapter. 
                Click any chapter to expand, then click formula cards to flip and see descriptions.
              </p>
              <p className="text-sm text-gray-500">
                🚧 Content is being added. Check back soon for complete coverage!
              </p>
            </div>
          </div>
        </div>

        {/* Chapters List */}
        <div className="space-y-3">
          {Object.entries(currentSubject.chapters).map(([key, chapter]) => (
            <div key={key} className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              
              {/* Chapter Header */}
              <button
                onClick={() => toggleChapter(key)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <h3 className="text-lg font-semibold text-gray-900">{chapter.title}</h3>
                  <span className="text-sm text-gray-500">
                    ({chapter.formulas.length} formulas)
                  </span>
                </div>
                {selectedChapter === key ? (
                  <ChevronUp className="w-5 h-5 text-gray-600" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-600" />
                )}
              </button>

              {/* Chapter Content */}
              {selectedChapter === key && (
                <div className="border-t border-gray-200 p-6 bg-gray-50">
                  {chapter.formulas.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      <p>Formulas coming soon for this chapter.</p>
                      <p className="text-sm mt-2">We're working on adding comprehensive content!</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {chapter.formulas.map((formula) => (
                        <div
                          key={formula.id}
                          onClick={() => toggleCard(formula.id)}
                          className="bg-white border-2 border-gray-300 rounded-lg p-6 cursor-pointer hover:border-gray-900 transition-all min-h-[140px] flex flex-col justify-center"
                        >
                          {!flippedCards[formula.id] ? (
                            <div className="text-center">
                              <p className="text-sm text-gray-600 mb-3">{formula.name}</p>
                              <p className="text-2xl font-mono font-semibold text-gray-900">
                                {formula.formula}
                              </p>
                            </div>
                          ) : (
                            <div className="text-center">
                              <p className="text-gray-700">{formula.description}</p>
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
          ))}
        </div>

        {/* Footer Info */}
        <div className="mt-12 text-center text-sm text-gray-500">
          <p>💡 Tip: Click formula cards to flip and see descriptions</p>
          <p className="mt-2">Coming soon: Search, Favorites, Quiz Mode, PDF Export</p>
        </div>

      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 mt-16 py-8 bg-white">
        <div className="max-w-6xl mx-auto px-4 text-center text-gray-600">
          <p className="text-sm">FormulaFlash - Complete JEE Formula Bank</p>
          <p className="text-xs mt-2 text-gray-500">Physics • Chemistry • Mathematics</p>
        </div>
      </footer>
    </div>
  );
}

export default FormulaFlash;