import * as NodePath from 'node:path'
import * as NodeUrl from 'node:url'

export class NodeUtil {
    static appendFileName(dirUrl: NodeUrl.URL, fileName: string) {
        // URL("file", "file:///path/to/") => got "file:///path/file", wrong!
        const fileUrl = new NodeUrl.URL(dirUrl.protocol)
        fileUrl.host = dirUrl.host
        fileUrl.pathname = NodePath.join(dirUrl.pathname, fileName)
        return fileUrl
    }
}
