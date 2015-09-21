using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Formatting;
using System.Web;
using Travian.Web.API.Models;

namespace Travian.Web.API.Formatters
{
    public class VillageCsvFormatter : BufferedMediaTypeFormatter
    {

        public VillageCsvFormatter()
        {
            SupportedMediaTypes.Add(new System.Net.Http.Headers.MediaTypeHeaderValue("text/csv"));
        }
        public override bool CanWriteType(System.Type type)
        {
            if (type == typeof(Village))
            {
                return true;
            }
            else
            {
                Type enumerableType = typeof(IEnumerable<Village>);
                return enumerableType.IsAssignableFrom(type);
            }
        }
        public override bool CanReadType(Type type)
        {
            return false;
        }
        public override void WriteToStream(Type type, object value, Stream writeStream, HttpContent content)
        {
            using (var writer = new StreamWriter(writeStream))
            {
                var villages = value as IEnumerable<Village>;
                if (villages != null)
                {
                    foreach (var village in villages)
                    {
                        WriteItem(village, writer);
                    }
                }
                else
                {
                    var singleVillage = value as Village;
                    if (singleVillage == null)
                    {
                        throw new InvalidOperationException("Cannot serialize type");
                    }
                    WriteItem(singleVillage, writer);
                }
            }
        }

        // Helper methods for serializing Villages to CSV format. 
        private void WriteItem(Village village, StreamWriter writer)
        {
            //writer.WriteLine("{0},{1},{2},{3}", Escape(village.Id),
            //    Escape(village.Name), Escape(village.Category), Escape(village.Price));
        }

        static char[] _specialChars = new char[] { ',', '\n', '\r', '"' };

        private string Escape(object o)
        {
            if (o == null)
            {
                return "";
            }
            string field = o.ToString();
            if (field.IndexOfAny(_specialChars) != -1)
            {
                // Delimit the entire field with quotes and replace embedded quotes with "".
                return String.Format("\"{0}\"", field.Replace("\"", "\"\""));
            }
            else return field;
        }
    }
}