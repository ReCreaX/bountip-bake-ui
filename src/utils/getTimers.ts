export const ConvertTimeToSeconds = ({
  leadTimeHours,
  leadTimeMinutes,
  leadTimeSeconds,
}: {
  leadTimeHours: string;
  leadTimeMinutes: string;
  leadTimeSeconds: string;
}): number => {
  const hours = parseInt(leadTimeHours || "0", 10);
  const minutes = parseInt(leadTimeMinutes || "0", 10);
  const seconds = parseInt(leadTimeSeconds || "0", 10);

  const totalSeconds = hours * 3600 + minutes * 60 + seconds;

  return totalSeconds;
};


export const ConvertSecondsToTime = (
    totalSeconds: number
  ): {
    leadTimeHours: string;
    leadTimeMinutes: string;
    leadTimeSeconds: string;
  } => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
  
    return {
      leadTimeHours: hours.toString(),
      leadTimeMinutes: minutes.toString(),
      leadTimeSeconds: seconds.toString(),
    };
  };
  
  export function formatDate(dateInput: string | Date): string {
    const date = dateInput instanceof Date ? dateInput : new Date(dateInput);
  
    // Use UTC components (you can change to local if needed)
    const day = String(date.getUTCDate()).padStart(2, '0');
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const year = date.getUTCFullYear();
  
    let hours = date.getUTCHours();
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
  
    // Convert to 12-hour format
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12; // Convert 0 => 12
    const hourStr = String(hours).padStart(2, '0');
  
    return `${day}/${month}/${year} ${hourStr}:${minutes} ${ampm}`;
  }
  


 
 