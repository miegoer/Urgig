

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
      <div className="grid grid-cols-[repeat(12,[col-start]_1fr)]">
        <div className="col-[col-start_1_/_span_4] row-[2_/_span_4]">
          Map Search
        </div>
        <div className="col-[col-start_5_/_span_5] row-[2_/_span_4]">
            {children}
        </div>
      </div>
    );
  }