import ScrollableAnswersDisplay from './ScrollableAnswersDisplay';

export default function AnswerTabsSection() {
  return (
    <section className="min-h-[80vh] p-8 lg:p-16">
      <div className="max-w-3xl mx-auto mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center">
          Your Choices for the Pacific Future
        </h2>
        <p className="text-lg md:text-xl leading-relaxed text-white/90 text-center">
          These are the decisions you made during your journey, organized by the seven pillars of the Blue Pacific 2050 Strategy. Each choice contributes to shaping the future scenario you experienced.
        </p>
      </div>

      <ScrollableAnswersDisplay />
    </section>
  );
}