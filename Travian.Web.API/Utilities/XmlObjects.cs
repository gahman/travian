using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Xml;
using System.Xml.Serialization;
using Travian.Web.API.Models;

namespace Travian.Web.API.Utilities
{
    public class XmlObjects
    {
        public static T ConvertXmlToClass<T>(string xml)
        {
            var serializer = new XmlSerializer(typeof(T));
            return (T)serializer.Deserialize(new StringReader(xml));
        }

        public static string ConvertClassToXml<T>(T obj) where T : EntityBase
        {
            var serializer = new XmlSerializer(typeof(ApiRoot));

            ApiRoot root = obj as ApiRoot;

            if (typeof(T) == typeof(Player))
            {
                root = new ApiRoot(obj as Player);
            }


            StringWriter writer = new StringWriter();
            serializer.Serialize(writer, root);
            writer.Close();
            string xmlData = writer.ToString();

            return xmlData;
        }

        // convert a api xml to player including villages (and history)
        public static Player ConvertXmlToPlayer(string xml)
        {
            var serializer = new XmlSerializer(typeof(ApiRoot));

            ApiRoot root = (ApiRoot)serializer.Deserialize(new StringReader(xml));

            Player player = root.Player;
            player.Villages = root.Villages;
            player.Villages.ForEach(v => v.Player = player);

            return player;
        }
    }
}