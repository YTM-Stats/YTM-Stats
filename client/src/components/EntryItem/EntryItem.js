function getInitialsFromArtist(artist) {
  return artist.split(" ").reduce((prev, curr) => prev + curr[0], "");
}
export default function EntryItem({
  entry,
  entryNumber,
  type = "song",
  ...props
}) {
  const artist =
    type.toLowerCase() === "artist" ? entry.title : entry.artists[0].name;
  let content = (
    <>
      {type !== "artist" && (
        <span className="block text-xs font-bold text-black">{artist}</span>
      )}
      <p className="text-xs font-medium text-gray-700">
        {type === "artist" ? "Songs played: " : "Listened at: "}
        <span className="text-xs font-normal text-gray-400">
          {type === "artist" ? `${entry.plays} times.` : entry.time}
        </span>
      </p>
    </>
  );

  return (
    <div
      className="flex overflow-hidden items-stretch w-full bg-gray-200 rounded-2xl transition-colors hover:bg-gray-300"
      {...props}
    >
      <div
        className={`bg-gray-400 w-[90px] relative flex items-center justify-center`}
      >
        <span className="flex absolute top-0 justify-start items-center py-1 pl-4 w-full text-xs font-bold text-white bg-gray-500">
          #{entryNumber}
        </span>
        <span>{getInitialsFromArtist(artist)}</span>
      </div>

      <div className="flex flex-col items-start p-4">
        <span className="block text-base text-black">{entry.title}</span>
        {content}
      </div>
    </div>
  );
}
