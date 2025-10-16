import type {ISeat} from "@/types/ISeat.ts";

export default function Seat({ seat, selected, onToggle }: {
    seat: ISeat;
    selected: boolean;
    onToggle: (s: ISeat) => void;
}) {
    return (
        <button
            onClick={() => !seat.daDat && onToggle(seat)}
            disabled={seat.daDat}
            title={`${seat.tenGhe} - ${seat.loaiGhe}`}
            className={[
                "w-[3rem] h-[3rem] rounded-sm flex items-center justify-center text-[10px] font-semibold transition-colors duration-100",
                seat.daDat
                    ? "bg-gray-700 text-gray-200 cursor-not-allowed"
                    : seat.loaiGhe === "Vip"
                        ? selected
                            ? "bg-yellow-400 text-black"
                            : "bg-yellow-600 hover:bg-yellow-500 text-white"
                        : selected
                            ? "bg-emerald-500 text-white"
                            : "bg-gray-500 hover:bg-emerald-600 text-white",
            ].join(" ")}
        >
            {seat.stt}
        </button>
    );
}
