import { cn } from "@/lib/utils"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card"
import  {useShared} from "@/store/files"

type CardProps = React.ComponentProps<typeof Card>

const SharedList = ({ className, ...props }: CardProps) => {
    
    const sharedFiles = useShared(s=>s.SharedFiles);
    const count = useShared(s=>s.count)


  return (
    <Card className={cn("w-[380px]", className)} {...props}>
      <CardHeader>
        <CardDescription className="text-center">{count} files shared over this connection</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4 overflow-y-scroll h-[69vh] mb-[2vh] mx-4">
        <div>
          {sharedFiles.map((file) => (
            <div
              key={file.id}
              className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
            >
              <span className={`flex h-2 w-2 translate-y-1 rounded-full  ${file.status?'bg-green-500':'bg-yellow-500 animate-pulse'}`} />
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">
                  {file.name}
                </p>
                <p className="text-sm text-muted-foreground">
                  {Math.floor(file.size/1000)}KB
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default SharedList