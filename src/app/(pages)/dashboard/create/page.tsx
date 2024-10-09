import CreateEvent from "@/app/ui/dashboard/createEvent";

export default function Create() {
  return (
    <>
      <div className="grid grid-cols-7 grid-rows-[h-24] ">
        <div className="col-start-2 row-start-1">
          <CreateEvent></CreateEvent>
        </div>
      </div>
    </>
  );
}
