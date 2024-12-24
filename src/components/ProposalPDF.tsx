import { Document, Page, Text, View, StyleSheet, PDFViewer, Font } from '@react-pdf/renderer';
import { ProposalFormData } from '@/types/proposal';

// Register fonts
Font.register({
  family: 'Open Sans',
  src: 'https://fonts.gstatic.com/s/opensans/v29/memvYaGs126MiZpBA-UvWbX2vVnXBbObj2OVTS-mu0SC55I.woff2'
});

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: 'Open Sans',
  },
  section: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: '#1a365d',
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 15,
    color: '#2d3748',
  },
  heading: {
    fontSize: 16,
    marginBottom: 10,
    marginTop: 15,
    color: '#2d3748',
  },
  text: {
    fontSize: 12,
    marginBottom: 8,
    lineHeight: 1.6,
    color: '#4a5568',
  },
  list: {
    marginLeft: 15,
    marginBottom: 10,
  },
  listItem: {
    fontSize: 12,
    marginBottom: 5,
  },
});

interface ProposalPDFProps {
  data: ProposalFormData;
}

export const ProposalPDF = ({ data }: ProposalPDFProps) => {
  // Early return if no data
  if (!data) {
    return (
      <PDFViewer style={{ width: '100%', height: '800px' }}>
        <Document>
          <Page size="A4" style={styles.page}>
            <View style={styles.section}>
              <Text style={styles.title}>No proposal data available</Text>
            </View>
          </Page>
        </Document>
      </PDFViewer>
    );
  }

  return (
    <PDFViewer style={{ width: '100%', height: '800px' }}>
      <Document>
        <Page size="A4" style={styles.page}>
          {/* Header */}
          <View style={styles.section}>
            <Text style={styles.title}>{data.title || 'Untitled Proposal'}</Text>
            <Text style={styles.text}>Prepared by: {data.company_name || 'Company Name'}</Text>
            {data.website_url && (
              <Text style={styles.text}>Website: {data.website_url}</Text>
            )}
          </View>

          {/* Primary Goal */}
          {data.primary_goal && (
            <View style={styles.section}>
              <Text style={styles.heading}>Executive Summary</Text>
              <Text style={styles.text}>{data.primary_goal}</Text>
            </View>
          )}

          {/* Services */}
          {data.services && data.services.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.heading}>Our Services</Text>
              <View style={styles.list}>
                {data.services.map((service, index) => (
                  <Text key={index} style={styles.listItem}>• {service}</Text>
                ))}
              </View>
            </View>
          )}

          {/* Challenges */}
          {data.challenges && data.challenges.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.heading}>Challenges We'll Address</Text>
              <View style={styles.list}>
                {data.challenges.map((challenge, index) => (
                  <Text key={index} style={styles.listItem}>• {challenge}</Text>
                ))}
              </View>
            </View>
          )}

          {/* Success Metrics */}
          {data.success_metrics && data.success_metrics.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.heading}>Success Metrics</Text>
              <View style={styles.list}>
                {data.success_metrics.map((metric, index) => (
                  <Text key={index} style={styles.listItem}>
                    • {metric.id}: {metric.value}
                  </Text>
                ))}
              </View>
            </View>
          )}

          {/* Recommended Strategies */}
          {data.recommended_strategies && data.recommended_strategies.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.heading}>Our Approach</Text>
              <View style={styles.list}>
                {data.recommended_strategies.map((strategy, index) => (
                  <Text key={index} style={styles.listItem}>• {strategy}</Text>
                ))}
              </View>
            </View>
          )}

          {/* Why Choose Us */}
          {data.reasons_to_work_with && (
            <View style={styles.section}>
              <Text style={styles.heading}>Why Choose Us</Text>
              <Text style={styles.text}>{data.reasons_to_work_with}</Text>
            </View>
          )}

          {/* Testimonials */}
          {data.testimonials && data.testimonials.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.heading}>What Our Clients Say</Text>
              <View style={styles.list}>
                {data.testimonials.map((testimonial, index) => (
                  <Text key={index} style={styles.listItem}>
                    "{testimonial.text}" - {testimonial.client}
                  </Text>
                ))}
              </View>
            </View>
          )}
        </Page>
      </Document>
    </PDFViewer>
  );
};