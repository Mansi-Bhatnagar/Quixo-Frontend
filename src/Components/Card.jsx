const Card = ({ card }) => {
  return (
    <div className="rounded-md bg-[#5c677d] cursor-pointer min-h-14 text-white p-2">
      <p>{card.title}</p>
    </div>
  );
};

export default Card;
