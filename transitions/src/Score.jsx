const loadingUrl = "/images/loading.webp";

export default function Score({
  home,
  away,
  awayName,
  homeName,
  homeImage,
  awayImage,
  isPending,
}) {
  return (
    <div className="score">
      <div>
        <h2>{isPending ? "HOME" : homeName}</h2>
        <h3>{isPending ? "-" : home}</h3>
        <img src={isPending ? loadingUrl : homeImage} alt="home team" />
      </div>
      <div>
        <h2>{isPending ? "AWAY" : awayName}</h2>
        <h3>{isPending ? "-" : away}</h3>
        <img src={isPending ? loadingUrl : awayImage} alt="away team" />
      </div>
    </div>
  );
}
