import {Command, flags} from '@oclif/command'
import {cli} from 'cli-ux'
import fs = require('fs')
import {Parser} from 'json2csv'
import sprequest = require('sp-request')

export default class Export extends Command {
  static description = 'Exports all items from a SharePoint list into a CSV file'

  static examples = [
    "$ sharepoint-cli export --list 'Bio Samples' --subsite microarray --site https://myrtb.nih.gov --output" +
    ' list-items.csv --top 200',
    'Outputs a CSV containing the item properties from the first 200 entries from the "Bio Samples" list'
  ]

  static flags = {
    help: flags.help({char: 'h'}),
    output: flags.string({
      char: 'o',
      description: 'Path to output file',
      required: true
    }),
    subsite: flags.string({
      description: 'SharePoint subsite to access',
      default: 'microarray'
    }),
    site: flags.string({
      description: 'SharePoint root site',
      default: 'https://myrtb.nih.gov'
    }),
    list: flags.string({
      char: 'l',
      description: 'SharePoint list name to export',
      required: true
    }),
    top: flags.string({
      char: 't',
      description: 'Max number of items to get from the list. It corresponds to the SharePoint REST API "top" query' +
      ' parameter.',
      default: '100'
    }),
    delimiter: flags.string({
      options: ['tab', 'csv'],
      description: 'The delimiter to use for the output file items.',
      default: 'csv'
    })
  }

  static args = []

  async run() {
    const {flags} = this.parse(Export)
    const username = await cli.prompt('What is your Windows login name?')
    const password = await cli.prompt('What is your password?', {type: 'hide'})

    // Initialize authentication strategy or reuse cached credentials when they exist.
    let spr = sprequest.create({
      username,
      password
    })

    cli.action.start('Requesting SharePoint list data...')

    const {body: {d: {results}}} = await spr.get(`${flags.site}/${flags.subsite}/_api/web/lists/GetByTitle('${flags.list}')/items?$top=${flags.top}`)

    // Remove hidden fields
    const filtered = results.map((item: any) => {
      const keys = Object.keys(item)

      for (const key of keys) {
        if ([
          '__metadata',
          'FirstUniqueAncestorSecurableObject',
          'RoleAssignments',
          'AttachmentFiles',
          'FieldValuesAsHtml',
          'FieldValuesAsText',
          'FieldValuesForEdit',
          'ParentList',
          'FileSystemObjectType',
          'GUID',
          'OData__UIVersionString',
          'GetDlpPolicyTip',
          'OData__x0043_y3',
          'OData__x0043_y5',
          'Attachments',
          'ContentType',
          'File',
          'Folder',
          'AuthorId',
          'EditorId'
        ].includes(key)) {
          delete item[key]
        }
      }

      return item
    })

    const parser = new Parser({})
    const csv = parser.parse(filtered)

    switch (flags.delimiter) {
      case 'csv':
        fs.writeFileSync(flags.output, csv)
        break
      case 'tab':
        fs.writeFileSync(flags.output, csv.replace(/,/g, '\t'))
        break
    }

    cli.action.start(`Wrote SharePoint list items to file "${flags.output}"...`)
  }
}
