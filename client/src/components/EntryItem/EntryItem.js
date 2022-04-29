function getInitialsFromArtist(artist) {
  return artist.split(" ").reduce((prev, curr) => prev + curr[0], "");
}
export default function EntryItem({ entry, entryNumber, ...props }) {
  const { title, time: listenDate, artists } = entry;
  return (
    <div
      className="flex items-stretch w-full bg-gray-200 rounded-2xl transition-colors hover:bg-gray-300 overflow-hidden"
      {...props}
    >
      <div
        className={`bg-gray-400 w-[90px] relative flex items-center justify-center`}
      >
        <span className="flex absolute top-0 justify-start items-center py-1 pl-4 w-full text-xs font-bold text-white bg-gray-500">
          #{entryNumber}
        </span>
        <span>{getInitialsFromArtist(artists[0].name)}</span>
      </div>

      <div className="flex flex-col items-start p-4">
        <span className="block text-base text-black">{title}</span>
        <span className="block text-xs font-bold text-black">
          {artists[0].name}
        </span>
        <p className="text-xs font-medium text-gray-700">
          Listened at:{" "}
          <span className="text-xs font-normal text-gray-400">
            {listenDate}
          </span>
        </p>
      </div>
    </div>
  );
}
