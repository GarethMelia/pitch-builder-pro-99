import { Document, Page, Text, View, StyleSheet, PDFViewer } from '@react-pdf/renderer';
import { ProposalFormData } from '@/types/proposal';

const styles = StyleSheet.create({
  page: {
    padding: 30,
  },
  section: {
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  heading: {
    fontSize: 18,
    marginBottom: 10,
    marginTop: 15,
  },
  subheading: {
    fontSize: 14,
    marginBottom: 5,
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
    lineHeight: 1.5,
  },
  list: {
    marginLeft: 15,
  },
  listItem: {
    fontSize: 12,
    marginBottom: 3,
  },
});

interface ProposalPDFProps {
  data: ProposalFormData;
}

export const ProposalPDF = ({ data }: ProposalPDFProps) => {
  return (
    <PDFViewer style={{ width: '100%', height: '800px' }}>
      <Document>
        <Page size="A4" style={styles.page}>
          {/* Header Section */}
          <View style={styles.section}>
            <Text style={styles.title}>{data.title}</Text>
            <Text style={styles.text}>Prepared by: {data.company_name}</Text>
            {data.website_url && (
              <Text style={styles.text}>Website: {data.website_url}</Text>
            )}
          </View>

          {/* Executive Summary */}
          <View style={styles.section}>
            <Text style={styles.heading}>Executive Summary</Text>
            <Text style={styles.text}>{data.primary_goal}</Text>
          </View>

          {/* Services */}
          <View style={styles.section}>
            <Text style={styles.heading}>Proposed Services</Text>
            <View style={styles.list}>
              {data.services?.map((service, index) => (
                <Text key={index} style={styles.listItem}>
                  • {service}
                </Text>
              ))}
            </View>
          </View>

          {/* Success Metrics */}
          <View style={styles.section}>
            <Text style={styles.heading}>Success Metrics</Text>
            <View style={styles.list}>
              {data.success_metrics?.map((metric, index) => (
                <Text key={index} style={styles.listItem}>
                  • {metric.id}: {metric.value}
                </Text>
              ))}
            </View>
          </View>

          {/* Strategies */}
          <View style={styles.section}>
            <Text style={styles.heading}>Recommended Strategies</Text>
            <View style={styles.list}>
              {data.recommended_strategies?.map((strategy, index) => (
                <Text key={index} style={styles.listItem}>
                  • {strategy}
                </Text>
              ))}
            </View>
          </View>

          {/* Company Credentials */}
          <View style={styles.section}>
            <Text style={styles.heading}>Why Work With Us</Text>
            <Text style={styles.text}>{data.reasons_to_work_with}</Text>
            
            {data.awards_recognitions && data.awards_recognitions.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.subheading}>Awards & Recognition</Text>
                <View style={styles.list}>
                  {data.awards_recognitions.map((award, index) => (
                    <Text key={index} style={styles.listItem}>
                      • {award}
                    </Text>
                  ))}
                </View>
              </View>
            )}

            {data.testimonials && data.testimonials.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.subheading}>Client Testimonials</Text>
                <View style={styles.list}>
                  {data.testimonials.map((testimonial, index) => (
                    <Text key={index} style={styles.listItem}>
                      "{testimonial.text}" - {testimonial.client}
                    </Text>
                  ))}
                </View>
              </View>
            )}
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
};